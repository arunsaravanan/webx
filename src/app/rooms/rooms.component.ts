import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetRooms, selectedRooms } from '../store/rooms';
import * as fromStore from './../store';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private store:Store<fromStore.State>) { }

  rooms$ = this.store.select(selectedRooms);

  ngOnInit(): void {
    this.rooms$ = this.store.pipe(select(fromStore.selectedRooms));
    this.store.dispatch(new GetRooms());
  }

}
