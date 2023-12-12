import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {

   
  imageurl = 'https://annapurnafarms.net/public/images/'
  ispasswordconfirm: boolean = false;
  constructor(  private http: HttpClient, 
    public router: Router,
    private postapi :AdminservicetwoService) { }
    notify:any
  ngOnInit() {
    this.getCategory()
  }
  Coupondata:any
  getCategory(){
    var setnull ="null"
    var appliedflag = JSON.parse(localStorage.getItem('appliedflag')|| setnull)
    
    this.postapi.getCoupon().subscribe(data => {
       this.Coupondata = data;
  // var arr  =  JSON.parse(this.ss[0].data)
      //this.notify =[ arr]
      const currentDate = new Date();
      this.Coupondata = this.Coupondata.filter((coupon: any) => {
        const expiredDate = new Date(coupon.expired_date);
        return expiredDate >= currentDate 
      });
      const appliedCouponIds = appliedflag.map((applied: any) => applied.id);

   // Filter out coupons that are not applied
    this.Coupondata = this.Coupondata.filter((coupon: any) => {
      return !appliedCouponIds.includes(coupon.id);
    });
      if(this.Coupondata.length ===0){
        this.ispasswordconfirm=true;
       }else{
        this.ispasswordconfirm=false;
       }
    console.log(this.Coupondata, 'category');
    
    });
  }
  gotoallproduct(item:any){
  localStorage.setItem('subproduct', JSON.stringify(item));
  this.router.navigate(['/all-product']);
}


}
