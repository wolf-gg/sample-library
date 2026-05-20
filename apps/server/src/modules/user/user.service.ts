import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'common/dto/user';
import { Model } from 'mongoose';
import { User } from './user.schema';

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

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

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
