import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { TID } from '../hotel-room/interfaces/hotel.room.interfaces';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { ValidationPipeCustom } from '../pipes/validation.pipe.custom';
import { User } from '../users/schemas/user.schemas';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current.user.decorator';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/api/client/register')
  @UsePipes(ValidationPipeCustom)
  async registration(@Body() registrationDTO: CreateUserDTO) {
    try {
      const user = await this.authService.registration(registrationDTO);
      return {
        id: user._id,
        email: user.email,
        name: user.lastName,
      };
    } catch (error) {
      return error;
    }
  }

  @Post('/api/auth/login')
  async login(@Req() req: Request, @Body() loginDTO: LoginDTO) {
    try {
      return await this.authService.login(loginDTO);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/auth/logout')
  async logout(@CurrentUser() user: User & { _id: TID }) {
    return await this.authService.logout(user._id);
  }
}
