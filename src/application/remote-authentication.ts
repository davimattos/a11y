import {HttpClient, HttpStatusCode} from '../data/protocols/http/http-client';
import {InvalidCredentialsError} from '../domain/errors/invalid-credentials-errors';
import {UnexpectedError} from '../domain/errors/unexpect-error';
import {Authentication} from '../domain/protocols/authentication';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        // @ts-ignore ** I don't want to mock a body if request fail, so the body is opcional
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
