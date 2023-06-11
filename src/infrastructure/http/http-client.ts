import axios from 'axios';
import {InvalidCredentialsError} from '../../domain/errors/invalid-credentials-errors';
import {UnexpectedError} from '../../domain/errors/unexpect-error';
import {HttpStatusCode} from '../../data/protocols/http/http-client';

const axiosDefault = {
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
};

const axiosHttp = axios.create(axiosDefault);

axiosHttp.interceptors.response.use(
  response => response,
  error => {
    switch (error.response.status) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  },
);

export default axiosHttp;
