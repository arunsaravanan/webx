import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { AuthCheck, selectAuthState, spinnerState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web Squad';
  constructor
  (
    private store:Store<fromStore.State>
  ) { }

  isLoading$ = this.store.select(spinnerState);

  ngOnInit(): void {
  }
}
