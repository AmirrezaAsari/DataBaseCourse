import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../modules/auth/services/auth.service';
import { LoginDto } from '../../requests/auth/login.dto';
import { CreateUserDto } from '../../requests/user/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<any> {
    const result = await this.authService.login(body.email, body.password);
    return {
      message: 'auth.login.success',
      data: result,
    };
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    const result = await this.authService.register(body);
    return {
      message: 'auth.register.success',
      data: result,
    };
  }
}
