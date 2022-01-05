import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetRooms, CreateRoom, selectedRooms, SelectRoom, selectedActiveRoom } from '../store/rooms';
import * as fromStore from './../store';
import { Spinner, spinnerState } from '../store/spinner';
import { AuthCheck } from './../store/auth';
import { PreviousRouteService } from '../services/previous.route.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(
    private store: Store<fromStore.State>,
    private previousRouteService: PreviousRouteService
  ) { }

  roomName: any;
  rooms$ = this.store.select(selectedRooms);
  selectedRoom$ = this.store.select(selectedActiveRoom);
  isLoading$ = this.store.select(spinnerState);

  ngOnInit(): void {
    this.store.dispatch(new Spinner({ isLoading: true }));
    if (this.previousRouteService.getPreviousUrl() == '/messages') {
      this.store.dispatch(new AuthCheck());
      this.store.dispatch(new GetRooms());
    }
    else {
      this.store.dispatch(new GetRooms());
    }
    this.rooms$ = this.store.pipe(select(fromStore.selectedRooms));
    this.selectedRoom$ = this.store.pipe(select(fromStore.selectedActiveRoom));
  }

  createRoom() {
    if (this.roomName !== "") {
      //console.log(this.roomName);
      this.store.dispatch(new Spinner({ isLoading: true }));
      this.store.dispatch(new CreateRoom({ title: this.roomName }));
      this.roomName = "";
    }
  }

  selectRoom(room: any) {
    //console.log(room);
    this.store.dispatch(new Spinner({ isLoading: true }));
    this.store.dispatch(new SelectRoom({ room: room }));
  }

}
