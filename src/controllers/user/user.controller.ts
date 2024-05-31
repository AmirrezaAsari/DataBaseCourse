import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../../modules/user/services/user/user.service';
import { UserGuard } from '../../guards/user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('profile')
  async show(@Request() req: any): Promise<any> {
    const user = await this.userService.findOne(req.user.sub);
    const result = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      type: user.type,
    };
    return {
      message: 'user.profile.show.success',
      data: result,
    };
  }
}
