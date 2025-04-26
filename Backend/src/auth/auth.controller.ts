import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // Inject the AuthService to handle authentication logic
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user and trigger OTP email' })
  @ApiResponse({
    status: 200,
    description: 'Account Registered successfully',
    type: SignUpResponseDto,
  })
  async registerUser(@Body() dto: SignUpDto, @Response() res) {
    const { user, accessToken } = await this.authService.registerUser(dto, res);

    res.status(200).json({
      user: user,
      accessToken,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login to your account' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  async login(@Request() req, @Body() loginDto: LoginDto, @Response() res) {
    const { user, accessToken } = await this.authService.login(req.user, res);

    res.status(200).json({
      user: user,
      accessToken,
    });
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout from your account' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  async logout(@Request() req, @Response() res) {
    await this.authService.logout(res);
    res.status(200).json({
      message: 'Logout successful',
    });
  }
}
