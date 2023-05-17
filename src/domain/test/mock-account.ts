import faker from 'faker';
import {AccountModel} from '../models/account-model';
import {Authentication} from '../protocols/authentication';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
