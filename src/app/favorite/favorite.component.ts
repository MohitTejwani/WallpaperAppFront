import { Component, OnInit } from '@angular/core';
import { ServerserviceService } from '../serverservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  page=1
  wallpaper=[]
  isLoading=false
  username: String
  constructor(public server:ServerserviceService, public router:Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    let isAuth = this.server.getIsAuthenticated();
    if(! isAuth ){
      this.router.navigate(['/'])
    }
    this.username= localStorage.getItem('username');
    this.wallpaper=[]

  this.getWallpapers();  
  }
  delfavorite(wid){
    console.log(wid)
    this.server.delFromfavorite(localStorage.getItem('userId'),wid).subscribe((res:any)=>{
      if(res.messege=="Delete to favorite"){
        console.log(res)
        this.toastr.success("Image","Remove  from favorite",{
          timeOut:500
        })
        this.ngOnInit()
      }
    })
  }

  getWallpapers(){
    this.isLoading =true
    this.server.getUserWallpaer(localStorage.getItem('userId')).subscribe((res:any)=>{
      this.isLoading = false
      this.page+=1
      this.wallpaper = res.docData

    })
  }
  logout(){
    this.server.logout();
  }
  onScroll() {
    this.getWallpapers()
  }
}
