import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { ServerserviceService } from '../serverservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  
    animations: [
      trigger('signIn', [
       
        state('open', style({
          opacity: 1,
          transform: 'scale(1)',         
        })),
        state('closed', style({
          opacity: 0,
          transform: 'scale(0)',
          display:'none'
        })),
        transition('open <=> closed', [
          animate('500ms linear')
        ]),
      ]),
      trigger('signUp', [
       
        state('open', style({
          opacity: 1,
          transform: 'scale(1)',         
        })),
        state('closed', style({
          opacity: 0,
          transform: 'scale(0)',
        })),
        transition('open <=> closed', [
          animate('500ms linear')
        ]),
      ]),
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _sigIn=false
  _signUp=false
  flag=false;
  invalid=false;
  constructor(public server:ServerserviceService,public router:Router) { }

  ngOnInit(): void {
    let isAuth = this.server.getIsAuthenticated();
    console.log(isAuth)
    if(isAuth){
      this.router.navigate(['/home'])
    }
  }

  get ExpresssignIn(){
    return this._sigIn ? 'open':'close'
  }
  get signUp(){
    return this._signUp ? 'open':'close'
  }
  toggleSignIn(){
    this._sigIn = !this._sigIn
    this.flag = !this.flag
  }

  toggleSignUp(){
    this._signUp = !this._signUp
  }

  login(data){
    console.log(data)
    if( data.email == "" || data.password == ""  ){
      return this.invalid = true 
    }
      this.server.getUserLogin(data).subscribe((res:any)=>{
        console.log(res)
        if(res.messege =="Login Sucessful" && res.token != null ){
          this.server.setTokenAndAuth(res.token,true,3600)
          localStorage.setItem('token',res.token)
          localStorage.setItem('userId',res.userId)
          localStorage.setItem('username',res.username)
          this.router.navigate(['/home'])
        }else{
          return this.invalid = true 
        }
      })
  }
  register(data){
    if(data.name == "" || data.email == "" || data.password == ""  ){
      return this.invalid = true 
    }
    this.server.postUserData(data).subscribe((res:any)=>{
      console.log(res)
        if(res.messege != "User Created"  && res.result != null || undefined ){
          this.invalid = true
        }else{
          this.flag = false
        }

    })
  }
  
}
