import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Logout } from '../store/auth';
import { GetMessages, selectedMessages } from '../store/messages';
import * as fromStore from './../store';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private store:Store<fromStore.State>,
    private router:Router) { }

    messages$ = this.store.select(selectedMessages);

  ngOnInit(): void {
    this.messages$ = this.store.pipe(select(fromStore.selectedMessages));
  }

  logout(){    
    this.store.dispatch(new Logout());
  }

}
