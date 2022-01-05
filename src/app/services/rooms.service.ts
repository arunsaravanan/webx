import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, mergeMap } from 'rxjs/operators';
import { API_BASE_URL, CREATE_ROOM_URL, GET_ROOMS_URL, GET_TEAMS_URL } from './api.config';
import { selectedActiveRoom } from '../store/rooms';
import * as fromStore from './../store';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private http:HttpClient,
    private store: Store<fromStore.State>
    ) { }

  getRooms(){
    return this.http
      .get(`${API_BASE_URL}${GET_TEAMS_URL}`)
      .pipe(mergeMap((res:any) => this.http.get(`${API_BASE_URL}${GET_ROOMS_URL}?teamId=${res.items[0].id}`)));
  }
  createRoom(title: any) {
    let body: any = {};
    body.title = title;
    this.store.select(selectedActiveRoom).pipe(first())
    .subscribe(value => {
      body.teamId = value.teamId;
    });
    return this.http
      .post(`${API_BASE_URL + CREATE_ROOM_URL}`, body);
  }
}
