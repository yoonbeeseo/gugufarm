import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { FirebaseModule } from 'src/firebase.module';

@Module({
  imports: [FirebaseModule.forRootAsync()],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
