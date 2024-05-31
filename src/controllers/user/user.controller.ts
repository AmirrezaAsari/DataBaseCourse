import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UserService } from '../../modules/user/services/user/user.service';
import { UserGuard } from '../../guards/user.guard';
import { UpdateUserDto } from '../../requests/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('profile')
  async show(@Request() req): Promise<any> {
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

  @UseGuards(UserGuard)
  @Put('profile')
  async update(@Request() req, @Body() body: UpdateUserDto): Promise<any> {
    const user = await this.userService.findOne(req.user.sub);
    const inputs = {
      name: body.name || user.name,
      email: body.email || user.email,
      password: body.password || user.password,
      type: user.type,
    };
    const result = await this.userService.update(user.id, inputs);
    return {
      message: 'user.profile.update.success',
      data: result,
    };
  }
}
