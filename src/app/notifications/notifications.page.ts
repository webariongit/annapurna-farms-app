import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

 
  imageurl = 'https://annapurnafarms.net/public/images/'
  ispasswordconfirm: boolean = false;
  constructor(  private http: HttpClient, 
    public router: Router,
    private postapi :AdminservicetwoService) { }
    notify:any
  ngOnInit() {
    this.getCategory()
  }
  ss:any
  getCategory(){
   
    this.postapi.getnotifications().subscribe(data => {
       this.ss = data;
   var arr  =  JSON.parse(this.ss[0].data)
      this.notify =[ arr]
      if(this.notify.length ===0){
        this.ispasswordconfirm=true;
       }else{
        this.ispasswordconfirm=false;
       }
    console.log(this.notify, 'category');
    
    });
  }
  gotoallproduct(item:any){
  localStorage.setItem('subproduct', JSON.stringify(item));
  this.router.navigate(['/all-product']);
}

}
