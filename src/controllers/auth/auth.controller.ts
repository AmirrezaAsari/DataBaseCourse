import { Controller } from '@nestjs/common';
import { AuthService } from '../../modules/auth/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
