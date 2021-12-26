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
    return this.getLocalStorageItem("access_token");
  }

  get tokenType() {
    return this.getLocalStorageItem("token_type");
  }

  login() {
    let webxAuthorizeURL = API_BASE_URL+AUTHORIZE_URL;
    let params: { [key: string]: any } = environment.auth;
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    window.location.href = webxAuthorizeURL+queryString;
  }

  loginCheck():Observable<any> {
    if(this.getLocalStorageItem('access_token')){
    let time = Date.now();
    let accessTokenExpiry = time + Number(this.getLocalStorageItem('expires_in'));
    let refreshTokenExpiry = time + Number(this.getLocalStorageItem('refresh_token_expires_in'));
      if(time > refreshTokenExpiry){
        this.addOrRemoveLocalStorage(this._authFlag, JSON.stringify(false));
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
    return of(JSON.parse(JSON.stringify(this.getLocalStorageItem(this._authFlag))));
  }

  authorize(code:any) {
    this.addOrRemoveLocalStorage('access_code', code);
  }

  getAccessToken(grantType:string):Observable<any> {
    let webxTokenAPIURL = API_BASE_URL+ACCESS_TOKEN_URL;
    let headers = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    }
    let envParams: { [key: string]: any } = environment.access;
    envParams.grant_type = grantType;
    envParams.code = this.getLocalStorageItem('access_code');
    if(grantType == "refresh_token"){
      envParams.refresh_token = this.getLocalStorageItem("refresh_token");
      delete envParams.code;
      delete envParams.redirect_uri;
    }
    let queryString = Object.keys(envParams).map(key => key + '=' + envParams[key]).join('&');
    let params = new URLSearchParams(queryString);
    return this.http.post(webxTokenAPIURL, params.toString(), headers);
  }

  setAuthorization(data: any){
    this.addOrRemoveLocalStorage('access_token', data.access_token);
    this.addOrRemoveLocalStorage('expires_in', data.expires_in);
    this.addOrRemoveLocalStorage('refresh_token', data.refresh_token);
    this.addOrRemoveLocalStorage('refresh_token_expires_in', data.refresh_token_expires_in);
    this.addOrRemoveLocalStorage('token_type', data.token_type);
    this.addOrRemoveLocalStorage(this._authFlag, JSON.stringify(true));
  }

  clearSession() {
    this.addOrRemoveLocalStorage('access_token');
    this.addOrRemoveLocalStorage('expires_in');
    this.addOrRemoveLocalStorage('refresh_token');
    this.addOrRemoveLocalStorage('refresh_token_expires_in');
    this.addOrRemoveLocalStorage('token_type');
    this.addOrRemoveLocalStorage('access_code');
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  navigateToMessages(){
    this.router.navigate(['/messages']);
  }

  logout():Observable<any> {
    this.clearSession();
    this.addOrRemoveLocalStorage(this._authFlag, JSON.stringify(false));
    return of(true);
  }

  getLocalStorageItem(key: any) {
    return localStorage.getItem(key);
  }
  addOrRemoveLocalStorage(key: any, value: any = null) {
    if(value)
      localStorage.setItem(key, value);
    else
      localStorage.removeItem(key);
  }
}
