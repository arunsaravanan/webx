import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { AuthCheck } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-oidc';
  constructor
  (
    private store:Store<fromStore.State>
  ) { }
  //isAuthenticated$ = this.store.select(selectAuthState);

  ngOnInit(): void {
    this.store.dispatch(new AuthCheck());
  }
}
