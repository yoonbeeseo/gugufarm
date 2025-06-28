import { FirebaseConfig } from '@/config/firebase.config';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app!: admin.app.App;
  private db!: admin.firestore.Firestore;
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    try {
      const firebaseConfig = this.configService.get<FirebaseConfig>('firebase');

      this.app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: firebaseConfig?.projectId,
          clientEmail: firebaseConfig?.clientEmail,
          privateKey: firebaseConfig?.privateKey,
        }),
      });

      this.db = this.app.firestore();

      // Optional: Set Firestore settings
      this.db.settings({
        ignoreUndefinedProperties: true,
      });

      this.logger.log('Firebase Admin initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin', error);
      throw error;
    }
  }

  get firestore(): admin.firestore.Firestore {
    if (!this.db) {
      throw new Error('Firestore is not initialized');
    }
    return this.db;
  }

  // Helper method to get a collection reference
  collection(path: string): admin.firestore.CollectionReference {
    return this.firestore.collection(path);
  }

  // Helper method to get a document reference
  doc(path: string): admin.firestore.DocumentReference {
    return this.firestore.doc(path);
  }
}

export enum FBCollection {
  PROFILES = 'profiles',
  RECORDS = 'records',
}
