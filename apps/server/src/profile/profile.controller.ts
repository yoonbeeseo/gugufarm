import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile, ProfileWithoutID } from '@gugufarm/types';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profileService.findOne(id);
  }

  @Get()
  async findMany() {
    return await this.profileService.findAllUsers();
  }

  @Post()
  async createProfile(@Body() profile: Profile) {
    return await this.profileService.createOne(profile);
  }

  @Patch(':id')
  async updateSpecifi(
    @Param('id') id: string,
    @Body() data: [keyof Profile, any],
  ) {
    return await this.profileService.updateSpecific(id, data);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedProfile: ProfileWithoutID,
  ) {
    return await this.profileService.patchProfile({ ...updatedProfile, id });
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    return await this.profileService.deleteUser(id);
  }
}
