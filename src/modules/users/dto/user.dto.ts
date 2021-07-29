// export class UserDto {
//   readonly name: string;
//   readonly email: string;
//   readonly password: string;
//   readonly gender: string;
// }

import {
  isNotEmpty,
  MinLength,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

enum Gender {
  Male = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'Gender Must be either male or female',
  })
  readonly gender: string;
}
