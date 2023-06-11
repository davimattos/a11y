import React from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  act,
} from '@testing-library/react-native';

import {mockAccountModel} from '../../../domain/test/mock-account';
import {SaveAccessToken} from '../../../domain/protocols/save-access-token';
import {Validation} from '../../protocols/validation';
import {InvalidCredentialsError} from '../../../domain/errors/invalid-credentials-errors';

import Login from './login';

import faker from 'faker';
import {rest} from 'msw';
import {server} from '../../../infrastructure/test/server';

class SaveAccessTokenMock implements SaveAccessToken {
  // we follow the method flow, not effect the behavior
  accessToken: string = '';
  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
}

class ValidationStub implements Validation {
  errorMessage: any;
  // eg. the behavior or logic is not important, we can just simulate something
  validate(): string {
    return this.errorMessage;
  }
}

type SutTypes = {
  sut: RenderResult;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError?: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} saveAccessToken={saveAccessTokenMock} />,
  );

  return {sut, saveAccessTokenMock};
};

const simulateValidForm = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
) => {
  const emailField = sut.getByTestId('email');
  const passwordField = sut.getByTestId('password');

  fireEvent.changeText(emailField, email);
  fireEvent.changeText(passwordField, password);

  const button = sut.getByTestId('button');

  await act(() => {
    fireEvent.press(button);
  });
};

describe('Login Component', () => {
  // test('Should call Authetication with correct values', async () => {
  //   const {sut, authenticationSpy} = makeSut();

  //   const email = faker.internet.email();
  //   const password = faker.internet.password();

  //   await simulateValidForm(sut, email, password);

  //   expect(authenticationSpy.params).toEqual({email, password});
  // });

  // test('Should not call Authetication if form is invalid', async () => {
  //   const validationError = faker.random.word();
  //   const {sut, authenticationSpy} = makeSut({validationError});

  //   await simulateValidForm(sut);

  //   expect(authenticationSpy.callsCount).toBe(0);
  // });

  test('Should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const {sut} = makeSut();

    // jest
    //   .spyOn(authenticationSpy, 'auth')
    //   .mockReturnValueOnce(Promise.reject(error));

    server.resetHandlers(
      rest.post('http://localhost:3000/login', (req, res, ctx) =>
        res(ctx.status(401)),
      ),
    );

    await simulateValidForm(sut);

    const mainError = sut.getByTestId('main-error');
    expect(mainError.children[0]).toBe(error.message);
  });

  test('Should call SaveAccessToken on sucess', async () => {
    const account = mockAccountModel();

    server.resetHandlers(
      rest.post('http://localhost:3000/login', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(account)),
      ),
    );

    const {sut, saveAccessTokenMock} = makeSut();

    await simulateValidForm(sut);

    expect(account.accessToken).toBe(saveAccessTokenMock.accessToken);
  });

  // test('Should present error if SaveAccessToken fails', async () => {
  //   const error = new InvalidCredentialsError();
  //   const {sut, saveAccessTokenMock} = makeSut();

  //   jest
  //     .spyOn(saveAccessTokenMock, 'save')
  //     .mockReturnValueOnce(Promise.reject(error));

  //   await simulateValidForm(sut);

  //   const wrapperError = sut.getByTestId('error-wrapper');
  //   expect(wrapperError.children.length).toBe(1);
  //   const mainError = sut.getByTestId('main-error');
  //   expect(mainError.children[0]).toBe(error.message);
  // });
});
