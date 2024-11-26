import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SessionData } from 'express-session';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @SetMetadata('isPublic', true)
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Req() req: Request, @Session() session: SessionData) {
    console.log('login');

    session.user = {
      userId: req.user.userId,
      username: req.user.username,
      roles: req.user.roles,
    };

    console.log(session);

    return {
      status: HttpStatus.OK,
    };
  }

  @SetMetadata('isPublic', true)
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return {
      status: HttpStatus.CREATED,
      user,
    };
  }
}
