import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { LoginUserDto } from 'common/dto/login';

@Controller('login')
export class LoginController {
  constructor(private userService: UserService) {}

  @Post()
  async loginUser(@Body() loginRequest: LoginUserDto) {
    const user = await this.userService.findByUsername(loginRequest.username);

    if (user === null) {
      throw new BadRequestException('User is not a member of the library');
    }

    return user;
  }
}
