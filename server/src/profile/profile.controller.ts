import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from 'types/profile';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('test')
  test() {
    return 'testing profile/test api endpoint';
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('finding user with id', id);
    return this.profileService.findOne(id);
  }

  @Get()
  async findAll() {
    console.log('finding all users...');
    return await this.profileService.findAll();
  }

  @Post()
  async create(@Body() user: Profile) {
    return await this.profileService.create(user);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.profileService.deleteOne(id);
  }
}
