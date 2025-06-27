import { FBCollection, FirebaseService } from '@/firebase/firebase.service';
import { Profile } from '@gugufarm/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private fb: FirebaseService) {}

  async findAllUsers() {
    const snap = await this.fb.collection(FBCollection.PROFILES).get();
    return snap.docs.map((doc) => ({ ...doc.data() }));
  }

  async findOne(id: string) {
    const snap = await this.fb.collection(FBCollection.PROFILES).doc(id).get();
    if (!snap) {
      return null;
    }
    return snap.data();
  }
  async createOne(profile: Profile) {
    await this.fb
      .collection(FBCollection.PROFILES)
      .doc(profile.id)
      .set(profile);
    return { newUser: profile };
  }
  async updateSpecific(id: string, data: [keyof Profile, any]) {
    await this.fb
      .collection(FBCollection.PROFILES)
      .doc(id)
      .update({
        [data[0]]: data[1],
      });
    return {
      updatedData: {
        [data[0]]: data[1],
      },
    };
  }
  async patchProfile({ id, ...profile }: Profile) {
    await this.fb.collection(FBCollection.PROFILES).doc(id).update(profile);
    return { updatedData: profile };
  }

  async deleteUser(id: string) {
    const ref = this.fb.collection(FBCollection.PROFILES).doc(id);
    const snap = await ref.get();

    await ref.delete();

    return { deletedUser: snap.data() };
  }
}
