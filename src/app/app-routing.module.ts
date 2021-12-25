import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './auth/callback/callback.component';
import { LoginComponent } from './auth/login/login.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { 
      path: 'callback', 
      component: CallbackComponent
  },
  {
    path: 'messages',
    component: RoomsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', pathMatch: 'full', 
    redirectTo: '/login' 
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
