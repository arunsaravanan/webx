import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login } from './../../store/auth';
import { AuthService } from './../../services/auth.service';
import * as fromStore from './../../store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  responseType: string = 'code';
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
    environment.auth.response_type = this.responseType;
    this.store.dispatch(new Login());
  }

}
