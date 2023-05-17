import {SetStorage} from '../../../data/protocols/cache/local-storage';
import {LocalStorageAdapter} from '../../../infrastructure/cache/local-storage-adapter';

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter();
};
