import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserDto } from 'common/dto/user';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }
}
