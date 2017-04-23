import * as firebase from "firebase";
import {EventEmitter} from "@angular/core";

export interface IUpload {
  progress: number,
  url: string
}

export class StorageService {

  constructor() {
  }

  create(path: string, item: File): EventEmitter<IUpload> {
    let storageRef = firebase.storage().ref();

    let res = new EventEmitter();
    let state: IUpload = {
      progress: 0,
      url: null
    };
    let uploadTask: firebase.storage.UploadTask = storageRef.child(path).put(item);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snap) => {
        state.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        res.emit(state)
      },
      (err) => {
        res.error(err);
      },
      () => {
        state.progress = 100;
        state.url = uploadTask.snapshot.downloadURL;
        res.emit(state);
        res.complete();
      }
    );

    return res;
  }

}
