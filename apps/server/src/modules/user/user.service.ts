import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'common/dto/user';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async create(user: CreateUserDto) {
    const newUser = await this.userRepository.create(user);

    return {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ username });

    if (user === null) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
