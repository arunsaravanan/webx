import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login } from './../../store/auth';
import { AuthService } from './../../services/auth.service';
import * as fromStore from './../../store';
import { environment } from 'src/environments/environment';
import { PreviousRouteService } from 'src/app/services/previous.route.service';
import { ToastrService } from 'ngx-toastr';

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
    private previousRouteService:PreviousRouteService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn)
      this.authService.navigateToMessages();
    if(this.previousRouteService.getPreviousUrl() == '/messages')
      this.toastr.success('Logged out successfully!', 'Webex Messages', { closeButton: true });                                
  }

  submit(){
    environment.auth.response_type = this.responseType;
    this.store.dispatch(new Login());
  }

}
