import { Component, OnInit } from '@angular/core';
import { ServerserviceService } from '../serverservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page=1
  isLoading=false
  wallpaper=[]
  username:String
  constructor(public server:ServerserviceService, public router:Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    let isAuth = this.server.getIsAuthenticated();
    if(!isAuth ){
      this.router.navigate(['/'])
    }else{
      this.username= localStorage.getItem('username');

      this.toastr.success("Welcome","Mohit",{
        timeOut:500,
        positionClass: 'toast-top-full-width'
      })
    }
  this.getWallpapers();  
  
  }
  addfavorite(wid){
    console.log(wid)
    this.server.addTofavorite(localStorage.getItem('userId'),wid).subscribe((res:any)=>{
      if(res.messege=="add to favorite"){
        console.log(res)
        this.toastr.success("Image","Add to favorite",{
          timeOut:500
        })
      }else if(res.messege=="Already Exists"){
        this.toastr.warning("Already ","Image is Favorite",{
          timeOut:1000
        })
      }
    })
  }

  getWallpapers(){
    this.isLoading = true
    this.server.getWallpaper(this.page).subscribe((res:any)=>{
      this.isLoading = false
      console.log(res)
      this.page+=1
      for(let i=0;i<res.length;i++){
        this.wallpaper.push(res[i])
      }
    })
  }
  onScroll() {
    this.getWallpapers()
  }

  logout(){
    this.server.logout();
  }

}
