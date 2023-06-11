import {InvalidFieldError} from '../../errors';
import {FieldValidation} from '../../protocols';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}
