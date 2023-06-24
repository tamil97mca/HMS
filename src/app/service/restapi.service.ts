import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(public http: HttpClient, public afs: AngularFirestore) { }

  addSingleData(collectionPath: string, dataObject: any) {
    dataObject.id = this.afs.createId();
    return this.afs.collection(collectionPath).add(dataObject);
  }

  getSingleData(collectionPath: string, documentId: any) {
    return this.afs.collection(collectionPath).doc(documentId).valueChanges();
    // return this.afs.collection(collectionPath).doc(documentId).snapshotChanges().pipe(
    //   map((doc) => {
    //     if (doc.payload.exists) {
    //       let data: any = {};
    //       data['id'] = doc.payload.id;
    //       data = doc.payload.data();
    //       return data;
    //       // return { id, ...data };
    //     } else {
    //       throw new Error('Document not found.');
    //     }
    //   })
    // );
  }

  getAllData(collectionPath: string) {
    return this.afs.collection(collectionPath).snapshotChanges().pipe(
      map((snapshotChanges) =>
        snapshotChanges.map((doc) => {
          let data: any = {};
          data['id'] = doc.payload.doc.id;
          data = doc.payload.doc.data();
          return data;
          // return { id, ...data };
        })
      )
    );
  }

  getAllDataWithOrderBy(collectionPath: string) {
    return this.afs.collection(collectionPath, (ref) => ref.orderBy('fieldToSort')).snapshotChanges().pipe(
      map((snapshotChanges) =>
        snapshotChanges.map((doc) => {
          let data: any = {};
          data['id'] = doc.payload.doc.id;
          data = doc.payload.doc.data();
          return data;
          // return { id, ...data };
        })
      )
    );
  }

  updateSingleData(collectionPath: string, documentId: any, data: any) {
    return this.afs.collection(collectionPath).doc(documentId).set({mobile: '2323232323'});
    // return this.afs.doc(collectionPath+"/"+documentId).update(data);
  }
  deleteSingleData(collectionPath: string, documentId: any) {
    // return this.afs.collection(collectionPath).doc(documentId).delete();
    return this.afs.doc('Doctor/'+documentId).delete();    
  }

  async deleteAllData(collectionPath: string, documentIds: any) {
    for (let id of documentIds) {
      return await this.afs.collection(collectionPath).doc(id).delete();
    }
  }

}
