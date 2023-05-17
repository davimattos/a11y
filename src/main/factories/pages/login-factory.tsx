import React from 'react';

import Login from '../../../presentation/pages/login/login';
import {makeRemoteAuthentication} from '../usecases/authentication/remote-authentication-factory';
import {makeLocalSaveAccessToken} from '../usecases/save-access-token/local-save-access-token-factory';

export const MakeLogin: React.FC = () => (
  <Login
    authentication={makeRemoteAuthentication()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
);
