import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../../requests/user/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const inputs = {
      ...createUserDto,
      type: 'user',
    };
    if (await this.userService.findByEmail(inputs.email)) {
      const user = await this.userService.findByEmail(inputs.email);
      if (user?.password != inputs.password) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    await this.userService.create(inputs);
    const user = await this.userService.findByEmail(inputs.email);
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
