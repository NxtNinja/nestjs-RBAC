import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { SessionData } from 'express-session';
import { UseRoles } from 'nest-access-control';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Session() session: SessionData) {
    return this.userService.getMe(session.user.userId);
  }

  @UseRoles({
    resource: 'employeeInfo',
    action: 'update',
    possession: 'any',
  })
  @Post('promote')
  promoteUserToManager(@Body('employeeId') employeeId: string) {
    return this.userService.promoteUserToManager(employeeId);
  }

  @UseRoles({
    resource: 'employeeInfo',
    action: 'update',
    possession: 'any',
  })
  @Post('demote')
  demoteManagerToUser(@Body('employeeId') employeeId: string) {
    return this.userService.demoteManagerToUser(employeeId);
  }
}
