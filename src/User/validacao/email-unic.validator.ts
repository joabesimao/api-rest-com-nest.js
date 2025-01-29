import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUnicValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(value: any): Promise<boolean> {
    const userExists = await this.userRepository.existsWithEmail(value);
    return !userExists;
  }
}

export const EmailIsUnic = (optionValidation: ValidationOptions) => {
  return (obj: Object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: optionValidation,
      constraints: [],
      validator: EmailIsUnicValidator,
    });
  };
};
