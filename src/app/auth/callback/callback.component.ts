import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginSuccess } from './../../store/auth';
import { AuthService } from './../../services/auth.service';
import * as fromStore from './../../store';
import { selectAuthState  } from './../../store/auth';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor
  (
    private store:Store<fromStore.State>,
    private route:ActivatedRoute,
    private authService: AuthService
  ) { }
  isAuthenticated$ = this.store.select(selectAuthState);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('code') || '';
    this.authService.authorize(token);
    this.store.dispatch(new LoginSuccess());
  }

}
