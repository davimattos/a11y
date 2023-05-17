import {RemoteAuthentication} from '../../../../application/remote-authentication';
import {Authentication} from '../../../../domain/protocols/authentication';
import {makeApiUrl} from '../../http/api-url-factory';
import {makeAxiosHttpClient} from '../../http/axios-http-client-factory';

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
};
