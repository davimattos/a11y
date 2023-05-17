import {LocalSaveAccessToken} from '../../../../application/local-save-access-token';
import {SaveAccessToken} from '../../../../domain/protocols/save-access-token';
import {makeLocalStorageAdapter} from '../../cache/local-storage-adapter-factory';

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};
