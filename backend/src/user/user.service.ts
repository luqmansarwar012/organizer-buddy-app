import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserById(id: number) {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  remove(id: number) {
    console.log('test');
    return this.userRepository.delete(id);
  }
}
