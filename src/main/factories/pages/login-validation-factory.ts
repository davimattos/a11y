import {ValidationBuilder} from '../../../validation/builders/validation-builder';
import {ValidationComposite} from '../../../validation/validators';

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().build(),
  ]);
};
