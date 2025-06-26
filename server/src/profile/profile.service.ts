import { Profile, ProfileWithoutID } from './../../../types/profile';
import { Injectable } from '@nestjs/common';
import { DocumentData, WithFieldValue } from 'firebase-admin/firestore';
import { firestore } from 'src/lib/firebase';

@Injectable()
export class ProfileService {
  private ref = firestore.collection('profiles');

  async findAll() {
    const snap = await this.ref.get();
    return snap.docs.map((doc) => ({ ...doc.data() }));
  }

  async create(profile: ProfileWithoutID) {
    const ref = await this.ref.add(profile as WithFieldValue<DocumentData>);
    const doc = await ref.get();
    return { id: doc.id, ...doc.data() } as Profile;
  }

  async deleteOne(id: string) {
    const snap = await this.ref.doc(id).get();
    await this.ref.doc(id).delete();
    return { deletedUser: { ...snap.data() } };
  }
}
