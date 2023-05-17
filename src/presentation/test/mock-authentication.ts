import {AccountModel} from '../../domain/models/account-model';
import {Authentication} from '../../domain/protocols/authentication';
import {mockAccountModel} from '../../domain/test/mock-account';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: Authentication.Params;
  callsCount = 0;

  async auth(params: Authentication.Params): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
