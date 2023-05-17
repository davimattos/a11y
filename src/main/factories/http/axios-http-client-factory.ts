import {AxiosHttpClient} from '../../../infrastructure/http/axios-http-client';

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
