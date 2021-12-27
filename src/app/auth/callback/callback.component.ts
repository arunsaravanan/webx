import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginCompleted } from './../../store/auth';
import { AuthService } from './../../services/auth.service';
import * as fromStore from './../../store';
import { Spinner } from './../../store/spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor
    (
      private store: Store<fromStore.State>,
      private route: ActivatedRoute,
      private authService: AuthService,
      private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.store.dispatch(new Spinner({ isLoading: true }));
    let token = this.route.snapshot.queryParamMap.get('code') || '';
    if (token == '') {
      //Implicit grant flow
      let urlFragment: any = this.route.snapshot.fragment;
      let queryparams = urlFragment.split("&").reduce((prev: any, curr: any) => {
        var p = curr.split("=");
        prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        return prev;
      }, {});
      this.authService.setAuthorization(queryparams);
      this.store.dispatch(new LoginCompleted({ isLoggedIn: true }));
    } else {
      //Code grant flow
      this.authService.authorize(token);
      this.authService.getAccessToken('authorization_code')
      .subscribe(
        (result) => {
          this.authService.setAuthorization(result);
          this.store.dispatch(new LoginCompleted({ isLoggedIn: true }));
        },
        (error) => {
          this.store.dispatch(new Spinner({ isLoading: false }));
          this.toastr.error(error.error.message, 'Get access token failed!', {closeButton: true});
          this.authService.navigateToLogin();
        }
      )
    }
  }

}
