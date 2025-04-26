import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { User } from 'src/user/user.entity';

export class LoginDto {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  @IsString()
  password: string;
}


export class LoginResponseDto {
  @ApiProperty({ type : User })
  user: User;

    @ApiProperty({ example: 'accessToken' })
    accessToken: string;
}