import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetRooms, selectedRooms } from '../store/rooms';
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
    private store:Store<fromStore.State>,
    private previousRouteService: PreviousRouteService
    ) { }

  rooms$ = this.store.select(selectedRooms);
  isLoading$ = this.store.select(spinnerState);

  ngOnInit(): void {
    this.store.dispatch(new Spinner({isLoading: true}));
    if(this.previousRouteService.getPreviousUrl() == '/messages')
    {
      this.store.dispatch(new AuthCheck());
      this.store.dispatch(new GetRooms());
    }
    else
    {
      this.store.dispatch(new GetRooms());
    }    
    this.rooms$ = this.store.pipe(select(fromStore.selectedRooms));
  }

}
