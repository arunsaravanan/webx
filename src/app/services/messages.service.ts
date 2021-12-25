import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { API_BASE_URL, GET_MESSAGES_URL } from './api.config';
import * as fromStore from './../store';
import { selectedActiveRoom } from '../store/rooms';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  //room$ = new Subject<any>();//this.store.pipe(select(selectedActiveRoom));
  constructor(
    private http: HttpClient,
    private store: Store<fromStore.State>
  ) {
    //this.room$ = this.store.pipe(select(selectedActiveRoom));
  }

  getMessages(room: any) {
    console.log(room);
    return this.http
      .get(`${API_BASE_URL + GET_MESSAGES_URL}?roomId=${room.id}`);
  }

  async getRoom() {
    let state = await this.store
      .pipe(
        select(selectedActiveRoom),
        take(1)
      )
      .toPromise()

    return state;
  }

  /* getRoom() {
    return this.store.
      pipe(
        select(selectedActiveRoom))
      .pipe(
        take(1))
      .subscribe(
        state => state.activeRoom.id
      )
  } */
}
