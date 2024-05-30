import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from '../../modules/user/services/user/user.service';
import { UpdateUserDto } from '../../requests/user/update-user.dto';

@Controller('admin/user')
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @Get('index')
  async index() {
    const result = this.userService.findAll();
    return {
      message: 'user.index.success',
      data: result,
    };
  }

  @Get('show/:id')
  async show(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw Error('user not found.');
    }
    const result = await this.userService.findOne(id);
    return {
      message: 'user.show.success',
      data: result,
    };
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw Error('user not found.');
    }
    const updateInfo = {
      name: body.name || user.name,
      email: body.email || user.email,
      password: body.password || user.password,
      type: body.type || user.type,
    };
    const result = await this.userService.update(id, updateInfo);
    return {
      message: 'user.update.success',
      data: result,
    };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw Error('user not found.');
    }
    const result = await this.userService.delete(id);
    return {
      message: 'user.delete.success',
      data: result,
    };
  }
}
