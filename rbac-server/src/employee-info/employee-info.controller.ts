import { Controller, Get, Param, Session } from '@nestjs/common';
import { EmployeeInfoService } from './employee-info.service';
import { UseRoles } from 'nest-access-control';
import { SessionData } from 'express-session';

@Controller('employeeinfo')
export class EmployeeInfoController {
  constructor(private employeeInfoService: EmployeeInfoService) {}

  @UseRoles({
    resource: 'employeeInfo',
    action: 'read',
    possession: 'any',
  })
  @Get('allEmployee')
  getAllEmployees() {
    return this.employeeInfoService.getAllEmployees();
  }

  @UseRoles({
    resource: 'managedEmployeeData',
    action: 'read',
    possession: 'any',
  })
  @Get()
  getManagedEmployees(@Session() session: SessionData) {
    return this.employeeInfoService.getManagedEmployees(session.user.userId);
  }

  @UseRoles({
    resource: 'employeeDetails',
    action: 'read',
    possession: 'any',
  })
  @Get(':employeeId')
  getEmployeeById(@Param('employeeId') employeeId: string) {
    return this.employeeInfoService.getEmployeeById(employeeId);
  }

  @UseRoles({
    resource: 'employeeData',
    action: 'read',
    possession: 'any',
  })
  @Get(':department')
  getEmployeesByDepartment(
    @Param('sector') sector: string,
    @Session() session: SessionData,
  ) {
    return this.employeeInfoService.getEmployeesBySector(
      session.user.userId,
      session.user.roles[0],
      sector,
    );
  }
}
