import {rest} from 'msw';
import {mockAccountModel} from '../../domain/test/mock-account';

export const handlers = [
  rest.post('http://localhost:3000/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAccountModel()));
  }),
];
