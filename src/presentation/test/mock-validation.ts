import {Validation} from '../protocols/validation';

export class ValidationStub implements Validation {
  errorMessage: any;

  validate(): string {
    return this.errorMessage;
  }
}
