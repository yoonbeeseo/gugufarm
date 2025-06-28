import { FBCollection, FirebaseService } from '@/firebase/firebase.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PersonalRecord, PersonalRecordWithoutIds, Dan } from '@gugufarm/types';

@Injectable()
export class RecordsService {
  constructor(private fb: FirebaseService) {}

  private cursors = new Map<number, FirebaseFirestore.DocumentSnapshot>();
  private numOfRows: number = 10;

  async findAll(page: number, dan?: Dan) {
    if (!page) {
      throw new HttpException('No Page found', HttpStatus.BAD_REQUEST);
    }
    try {
      let ref = this.fb
        .collection(FBCollection.RECORDS)
        .orderBy('score', 'desc');
      if (dan) {
        ref = ref.where('dan', '==', dan);
      }

      let query = ref.limit(this.numOfRows);
      const lastDoc = this.cursors.get(page - 1);
      if (page > 1 && lastDoc) {
        query = ref.startAfter(lastDoc).limit(this.numOfRows);
      }

      const snap = await query.get();
      const records = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const cursor = snap.docs[records.length - 1] ?? null;

      this.cursors.set(page, cursor);

      return { records, cursor };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMyRecords(uid: string, page: number, dan?: Dan) {
    if (!page) {
      throw new HttpException('No Page found', HttpStatus.BAD_REQUEST);
    }
    try {
      let ref = this.fb
        .collection(FBCollection.RECORDS)
        .where('uid', '==', uid)
        .orderBy('createdAt');

      if (dan) {
        ref = ref.where('dan', '==', dan);
      }

      let query = ref.limit(this.numOfRows);
      const lastDoc = this.cursors.get(page - 1);
      if (page > 1 && lastDoc) {
        query = ref.startAfter(lastDoc).limit(this.numOfRows);
      }

      const snap = await query.get();
      const records = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const cursor = snap.docs[records.length - 1] ?? null;

      this.cursors.set(page, cursor);

      return { records, cursor };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async recordOne(uid: string, record: PersonalRecordWithoutIds) {
    try {
      const ref = this.fb.collection(FBCollection.RECORDS);
      const recordRef = await ref.add({ ...record, uid });
      return { record: { ...record, id: recordRef.id } };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async testPatch(uid: string, items: PersonalRecordWithoutIds[]) {
    try {
      const ref = this.fb.collection(FBCollection.RECORDS);
      const records: PersonalRecord[] = [];
      //! option 1
      //   for (const item of items) {
      //     let record: PersonalRecord = { ...item, id: '' };
      //     const recordRef = await ref.add({
      //       ...record,
      //       uid,
      //     } as PersonalRecordWithUid);
      //     record.id = recordRef.id;
      //     records.push(record);
      //   }

      //? option 2
      const batch = this.fb.firestore.batch();
      items.forEach((item) => {
        const recordRef = ref.doc();
        const record = { ...item, uid, id: recordRef.id };
        batch.set(recordRef, record);
        records.push(record);
      });
      await batch.commit();

      return { records, success: true };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
