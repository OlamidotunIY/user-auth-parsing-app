import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+14155552671' })
  @IsPhoneNumber(null, {
    message: 'Phone number must be a valid international phone number.',
  })
  phone: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(18)
  age: number;

  @ApiProperty({ example: 'securePassword' })
  @IsNotEmpty()
  password: string;
}

export class SignUpResponseDto {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ example: 'accessToken' })
  accessToken: string;
}
