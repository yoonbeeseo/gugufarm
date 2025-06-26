import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileWithoutID } from '../../../types/profile';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Post()
  create(@Body('profile') profile: ProfileWithoutID) {
    return this.profileService.create(profile);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.profileService.deleteOne(id);
  }
}
