import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { API_BASE_URL, GET_MESSAGES_URL } from './api.config';
import * as fromStore from './../store';
import { selectedActiveRoom } from '../store/rooms';
import { first, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpClient,
    private store: Store<fromStore.State>
  ) { }

  getMessages(room: any) {
    return this.http
      .get(`${API_BASE_URL + GET_MESSAGES_URL}?roomId=${room.id}`);
  }

  createMessage(message: any) {
    let body: any = {};
    body.text = message;
    this.store.select(selectedActiveRoom).pipe(first())
    .subscribe(value => {
      console.log(value);
      body.roomId = value.id;
    });
    return this.http
      .post(`${API_BASE_URL + GET_MESSAGES_URL}`, body);
  }
  deleteMessage(message: any) {
    return this.http
      .delete(`${API_BASE_URL + GET_MESSAGES_URL}/${message.id}`);
  }
}
