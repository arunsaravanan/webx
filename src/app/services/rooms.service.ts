import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, mergeMap } from 'rxjs/operators';
import { API_BASE_URL, CREATE_ROOM_URL, GET_ROOMS_URL, GET_TEAMS_URL } from './api.config';
import { selectedActiveRoom } from '../store/rooms';
import * as fromStore from './../store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private http: HttpClient,
    private store: Store<fromStore.State>
  ) { }

  getRooms() {
    return this.http
      .get(`${API_BASE_URL}${GET_TEAMS_URL}`)
      .pipe(mergeMap((res: any) => {
        if (res.items.length > 0)
          return this.http.get(`${API_BASE_URL}${GET_ROOMS_URL}?teamId=${res.items[0].id}`);
        return of({ items: [] });
      }));
  }
  createRoom(title: any) {
    let body: any = {};
    this.store.select(selectedActiveRoom).pipe(first())
      .subscribe(value => {
        body.teamId = value && value.teamId ? value.teamId : null;
      });
    if (body.teamId) {
      body.title = title;
      return this.http
        .post(`${API_BASE_URL + CREATE_ROOM_URL}`, body);
    } else {
      body.name = title;
      return this.http
        .post(`${API_BASE_URL + GET_TEAMS_URL}`, body);
    }
  }
}
