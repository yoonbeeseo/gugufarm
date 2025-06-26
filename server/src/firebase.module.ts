import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Module({})
export class FirebaseModule {
  static forRootAsync(): DynamicModule {
    return {
      module: FirebaseModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'FIREBASE_ADMIN',
          useFactory: (configService: ConfigService) => {
            const adminConfig = {
              projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
              privateKey: configService
                .getOrThrow<string>('FIREBASE_PRIVATE_KEY')
                ?.replace(/\\n/g, '\n'),
              clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
            };

            if (!admin.apps.length) {
              admin.initializeApp({
                credential: admin.credential.cert(adminConfig),
                // databaseURL: ... // only if needed
              });
            }

            return admin;
          },
          inject: [ConfigService],
        },
      ],
      exports: ['FIREBASE_ADMIN'],
    };
  }
}
