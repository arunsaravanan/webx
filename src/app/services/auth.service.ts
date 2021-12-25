import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ACCESS_TOKEN_URL, API_BASE_URL, AUTHORIZE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authFlag = "loggedIn";
  constructor(private http:HttpClient, private router:Router) { }
  
  get isLoggedIn() {
    return this.loginCheck();
  }
  get token() {
    return localStorage.getItem("access_token");
  }

  get tokenType() {
    return localStorage.getItem("token_type");
  }

  login() {
    let webxAuthorizeURL = API_BASE_URL+AUTHORIZE_URL;
    let params: { [key: string]: any } = environment.auth;
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    window.location.href = webxAuthorizeURL+queryString;
  }

  loginCheck():Observable<any> {
    if(localStorage.getItem('access_token')){
    let time = Date.now();
    let accessTokenExpiry = time + Number(localStorage.getItem('expires_in'));
    let refreshTokenExpiry = time + Number(localStorage.getItem('refresh_token_expires_in'));
      if(time > refreshTokenExpiry){
        localStorage.setItem(this._authFlag, JSON.stringify(false));
        this.clearSession();
      }
      else if(time > accessTokenExpiry){
        this.getAccessToken('refresh_token')
            .subscribe(
              (result) => {
                this.setAuthorization(result);
              }
            )
      }
    }
    return of(JSON.parse(JSON.stringify(localStorage.getItem(this._authFlag))));
  }

  authorize(code:any) {
    localStorage.setItem('access_code', code);
  }

  getAccessToken(grantType:string):Observable<any> {
    let webxTokenAPIURL = API_BASE_URL+ACCESS_TOKEN_URL;
    let headers = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    }
    let envParams: { [key: string]: any } = environment.access;
    envParams.grant_type = grantType;
    envParams.code = localStorage.getItem('access_code');
    if(grantType == "refresh_token"){
      envParams.refresh_token = localStorage.getItem("refresh_token");
      delete envParams.code;
      delete envParams.redirect_uri;
    }
    let queryString = Object.keys(envParams).map(key => key + '=' + envParams[key]).join('&');
    let params = new URLSearchParams(queryString);
    return this.http.post(webxTokenAPIURL, params.toString(), headers);
  }

  setAuthorization(data: any){
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('expires_in', data.expires_in);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('refresh_token_expires_in', data.refresh_token_expires_in);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem(this._authFlag, JSON.stringify(true));
  }

  clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token_expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('access_code');
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  navigateToMessages(){
    this.router.navigate(['/messages']);
  }

  logout():Observable<any> {
    this.clearSession();
    localStorage.setItem(this._authFlag, JSON.stringify(false));
    return of(true);
  }
}
