import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login } from './../../store/auth';
import { AuthService } from './../../services/auth.service';
import * as fromStore from './../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor
  (
    private store:Store<fromStore.State>,
    private router:Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn)
      this.authService.navigateToMessages();
  }

  submit(){
    this.store.dispatch(new Login());
  }

}
