import { Body, Inject, Injectable } from '@nestjs/common';
import { Profile } from 'types/profile';

@Injectable()
export class ProfileService {
  private ref: FirebaseFirestore.CollectionReference;

  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly admin: typeof import('firebase-admin'),
  ) {
    this.ref = this.admin.firestore().collection('profiles');
  }

  async findAll() {
    const snap = await this.ref.get();
    return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async findOne(id: string) {
    const snap = await this.ref.doc(id).get();

    if (snap) {
      return { id: snap.id, ...snap.data() };
    }
    return 'No Such User!';
  }

  async create(user: Profile) {
    await this.ref.doc(user.id).set(user);

    return { newUser: user };
  }

  async deleteOne(id: string) {
    const snap = await this.ref.doc(id).get();
    const deletedUser = { ...snap.data(), id };

    await this.ref.doc(id).delete();
    return { deletedUser };
  }
}
