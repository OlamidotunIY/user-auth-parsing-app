import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPO')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(dto: SignUpDto, res: Response) {
    try {
      // Check if user already exists
      const userExists = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (userExists) throw new BadRequestException('Email already exists');

      // Hash password
      const hashed = await bcrypt.hash(dto.password, 10);
      const user = this.userRepository.create({
        email: dto.email,
        password: hashed,
        name: dto.name,
        age: dto.age,
        phone: dto.phone,
      });

      // Generate JWT tokens
      const payload = { username: user.name, sub: user.id };

      const accessToken = this.jwtService.sign(
        { ...payload },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '30d',
        },
      );


      // Save user to the database
      const savedUser = await this.userRepository.save(user);

      // Return the response
      return {
        user: savedUser,
        accessToken,
      };
    } catch (error) {
      // Catch any error and send it as a response
      console.error('Registration error:', error);
      throw new BadRequestException('Registration failed. Please try again.');
    }
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async login(user: User, res: Response) {
    const payload = { username: user.name, sub: user.id };

    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '30d',
      },
    );

    return {
      user,
      accessToken
    };
  }

  async logout(res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    return {
      message: 'Logged out successfully',
    };
  }
}
