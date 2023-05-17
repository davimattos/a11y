import {createContext} from 'react';

const initialValue = {
  state: {},
  setState: (_value: any): void => {},
};

export default createContext(initialValue);
