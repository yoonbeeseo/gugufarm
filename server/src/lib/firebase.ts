// src/firebase.ts
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join } from 'path';

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '../firebase-service-account.json'), 'utf-8'),
) as ServiceAccount;

export const app = initializeApp({
  credential: cert(serviceAccount),
});

export const firestore = getFirestore(app);
