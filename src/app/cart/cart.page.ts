import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartlist:any
  imageurl = 'https://annapurnafarms.net/public/images/'
  itemprice:any
  constructor( public router: Router, private toastCtrl: ToastController,
    private postapi : AdminservicetwoService) { }
    guestid:any
    totalgst:any
  ngOnInit() {
  this.guestid =JSON.parse(sessionStorage.getItem('guestid')|| "1")
 this.list()
 this.getcoupuns()
  }
totalitemprice:any
  itempriceone:any
  list(){
    this.itemprice = 0
    this.totalgst=0
    this.totalitemprice = 0
    this.itempriceone =0
    var setnull ="null"
 this.cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
 for(var i=0 ; i < this.cartlist.length; i++){
  this.itemprice = (this.itemprice + this.cartlist[i].product_price * this.cartlist[i].product_qty) + ((this.cartlist[i].product_price * this.cartlist[i].product_qty) * this.cartlist[i].tax_percent / 100) 
  this.itempriceone = this.itempriceone + this.cartlist[i].product_price * this.cartlist[i].product_qty
  //{{ item.product_price +  (item.product_price * item.tax_percent / 100) }} 
  this.totalgst = this.totalgst + this.cartlist[i].tax_percent
 // this.totalitemprice= this.itemprice + this.cartlist[i].product_price * this.cartlist[i].product_qty
 }
 Math.round(this.itemprice)
 this.totalgst = Math.round(this.itemprice -this.itempriceone ) 

 this.totalitemprice= Math.round(this.itemprice)
 localStorage.setItem('itemprice', JSON.stringify(this.itemprice));
 console.log(this.itemprice);
  }

  Coupondata:any
  getcoupuns (){
    var setnull ="null"
    var appliedflag = JSON.parse(localStorage.getItem('appliedflag')|| setnull)
    
    this.postapi.getCoupon().subscribe(data => {
      this.Coupondata = data;
      this.Coupondata
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
   
   console.log(this.Coupondata, 'Coupondata');
   
   });
  }
  coupandiscount:any
  coupandiscountone:any
  selectedCategoryId :any
  // Define a flag to track whether a coupon has been applied
couponApplied = false;



 

  applaycoupan(item:any){
    this.selectedCategoryId = item.id
    if (item.type=='fixed') {
   if( item.minimum_amount <= this.totalitemprice  ){
   this.coupandiscountone = item.amount
      this.coupandiscount =this.totalitemprice-  item.amount
      this.itemprice= this.coupandiscount;
      this.toastCtrl.create({ duration: 3000, message: "Coupond apply Successfull!", position: 'top', }).then((t:any) => t.present())
      localStorage.setItem('appliedcoupan', JSON.stringify(item)||'0');
    
    }else{
      this.toastCtrl.create({ duration: 3000, message: "Discount amount is greater than item price can't apply to coupan!", position: 'top', }).then((t:any) => t.present())
    
    } 
    }
    if (item.type=="percentage") {
      this.coupandiscount=  (this.totalitemprice  * item.amount) /100
      this.itemprice=this.totalitemprice- this.coupandiscount;
      this.coupandiscountone =  this.coupandiscount
      this.toastCtrl.create({ duration: 3000, message: "Coupond apply Successfull!", position: 'top', }).then((t:any) => t.present())
    
      localStorage.setItem('appliedcoupan', JSON.stringify(item)||'0');
    }
   
  }

  checkout(){
   
    
    localStorage.setItem('itempriceone', JSON.stringify(this.itempriceone)||'0');
    localStorage.setItem('totalgst', JSON.stringify(this.totalgst)||'0');
    localStorage.setItem('coupandiscount', JSON.stringify(this.coupandiscountone)||'0');
    this.router.navigate(['/checkout']);
  }
  addtocard(data:any ){
    this.selectedCategoryId = false
    this.coupandiscountone=0
    console.log(data);
    
    
    var setnull ="null"
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
    
    const obj = {
      "category_id":data.category_id,
      "category_name":data.category_name,
      "product_id":data.product_id,
      "product_image":data.product_image,
      "product_name":data.product_name,
      "product_price":data.product_price,
      "product_qty":1,
      "product_code":data.product_code,
      "tax_name": data.tax_name,
    "tax_percent": data.tax_percent,
    "unit_code": data.unit_code,
    "unit_name": data.unit_name,
   
    }
      for (let i = 0; i < cartlist.length; i++) {
        if (cartlist[i].product_name === data.product_name) {
          if (cartlist[i].product_id === data.product_id) {
              obj.product_qty = cartlist[i].product_qty+1
              cartlist.splice(i, 1);
          }
        }
      }
    
       cartlist.push(obj);

       this.SaveCart(cartlist);
      
    }
  removeitem  (id:any) {
    
    if (confirm("Confirm to Delete Product?") == false) {
      return;
    }
    var n ="null"
    this.selectedCategoryId = false
    this.coupandiscountone=0
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| n);
    for (let i = 0; i < cartlist.length; i++) {
      if (cartlist[i].product_id === id) {
        cartlist.splice(i, 1);
        this.SaveCart(cartlist);
        break;
  
      }           
    }}

    SaveCart(objCart:any) {
      
    
        localStorage.setItem('cardlist', JSON.stringify(objCart));
        this.list ()
      
    
    }
}
