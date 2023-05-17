import AsyncStorage from '@react-native-community/async-storage';

import {SetStorage} from '../../data/protocols/cache/local-storage';

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    AsyncStorage.setItem(key, value);
  }
}
