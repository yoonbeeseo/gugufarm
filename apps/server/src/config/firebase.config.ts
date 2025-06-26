import { registerAs } from '@nestjs/config';
export interface FirebaseConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export default registerAs(
  'firebase',
  (): FirebaseConfig => ({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    //   databaseURL: process.env.FIREBASE_DATABASE_URL,
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  }),
);
