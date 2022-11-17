import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ExpressRequest } from 'src/utils/types/interfaces';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Get('user-list')
  getChatUserList(
    @Req() req: ExpressRequest
  ) {
    return this.userService.getChatUserList(req);
  }
}
