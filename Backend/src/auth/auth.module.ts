import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/user.providers';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey09900', // Use a secure environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, ...userProviders, ConfigService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
