import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { API_BASE_URL, GET_ROOMS_URL, GET_TEAMS_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http:HttpClient) { }

  getRooms(){
    return this.http
      .get(`${API_BASE_URL}${GET_TEAMS_URL}`)
      .pipe(mergeMap((res:any) => this.http.get(`${API_BASE_URL}${GET_ROOMS_URL}?teamId=${res.items[0].id}`)));
  }
}
