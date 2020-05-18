import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServerserviceService {
  rootUrl = "http://localhost:5000";
  // https://wallpapaerapi.herokuapp.com"
  private token: String
  private isAuthenticated = false
  expireTime:Number
  constructor(public http: HttpClient, public router: Router) { this.autoAuthUser() }
  getToken() {
    return this.token;
  }
  setTokenAndAuth(token:String,auth:boolean,expiresIn:Number){
    this.isAuthenticated = auth;
    this.token = token
    this.setAuthTimer(expiresIn)
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getUserLogin(formData){
    return this.http.post(this.rootUrl+'/userlogin',formData);
  }

  postUserData(formData) {
    return this.http.post(this.rootUrl + '/user', formData);
  }

  addTofavorite(id, wid) {
    return this.http.get(this.rootUrl + "/favorite/" + id + '/' + wid)
  }

  delFromfavorite(id, wid) {
    return this.http.get(this.rootUrl + "/delfavorite/" + id + '/' + wid)
  }

  getWallpaper(page) {
    return this.http.get(this.rootUrl + "/getwallpaper/" + page);
  }

  getUserWallpaer(id) {
    return this.http.get(this.rootUrl + "/getuserwallpaper/" + id);
  }
  logout(){
    localStorage.clear();
    this.isAuthenticated=false
    this.token=""
    this.router.navigate(['/'])
  }
  private setAuthTimer(duration) {
    console.log("Setting timer: " + duration);
    console.log(typeof(duration))
     setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }
  autoAuthUser(){
    this.token = localStorage.getItem('token')
    if(this.token){
      this.isAuthenticated = true
    }
  }
}
