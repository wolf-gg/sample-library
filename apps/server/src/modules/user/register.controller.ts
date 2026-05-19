import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserDto } from 'common/dto/user';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(@Body() user: CreateUserDto) {
    try {
      return await this.userService.create(user);
    } catch (error: unknown) {
      const duplicateKey =
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: number }).code === 11000;

      if (duplicateKey) {
        throw new BadRequestException('Username already exists');
      }

      throw new BadRequestException('Unable to create user');
    }
  }
}
