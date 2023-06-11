export class InvalidFieldError extends Error {
  constructor() {
    super('Invalid data');
    this.name = 'InvalidFieldError';
  }
}
