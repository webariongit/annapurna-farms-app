import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.page.html',
  styleUrls: ['./bag.page.scss'],
})
export class BagPage implements OnInit {

  constructor( private http: HttpClient,  public router: Router,
    private toastCtrl: ToastController,
    private postapi :AuthserviceService) { }
    order:any
    switchTab = 'pending';
  ngOnInit() {
    this.getorderlist()
  }
  getorderlist(){
    this.postapi.getorder().subscribe(data => {
      this.order = data;
      this.order.reverse()
    console.log(this.order);
    
    });
  }
  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
  }
  orderdetails(item:any){
    localStorage.setItem('orderdetailsid', JSON.stringify(item));
    this.router.navigate(['/order-details']);
  }
}
