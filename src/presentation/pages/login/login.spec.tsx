import React from 'react';
import {cleanup, render, RenderResult} from '@testing-library/react-native';

import {AuthenticationSpy} from '../../test/mock-authentication';
import {SaveAccessTokenMock} from '../../test/mock-save-access-token';
import {ValidationStub} from '../../test/mock-validation';

import Login from './login';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login
      validation={validationStub}
      authentication={authenticationSpy}
      saveAccessToken={saveAccessTokenMock}
    />,
  );

  return {sut, authenticationSpy, saveAccessTokenMock};
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should call Authetication with correct values', async () => {
    makeSut();
  });

  test('Should not call Authetication if form is invalid', async () => {});

  test('Should present error if Authentication fails', async () => {});

  test('Should call SaveAccessToken on sucess', async () => {});

  test('Should present error if SaveAccessToken fails', async () => {});
});
