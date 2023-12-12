import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.page.html',
  styleUrls: ['./fav-list.page.scss'],
})
export class FavListPage implements OnInit {
  imageurl = 'https://annapurnafarms.net/public/images/'
  constructor(  private toastCtrl: ToastController,public router: Router
    ,private alertController: AlertController,) { }
  favlist:any
  ispasswordconfirm: boolean = false;
  guestid:any
  ngOnInit() {
    console.log("data");
    var setnull ="null"
    this.guestid =JSON.parse(sessionStorage.getItem('guestid')|| "1")
 this.favlist = JSON.parse(localStorage.getItem('fav')|| setnull)
 if(this.favlist.length ===0){
  this.ispasswordconfirm=true;
 }else{
  this.ispasswordconfirm=false;
 }
 var setnull ="null"
 var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
 if(cartlist==null){
   localStorage.setItem('cardlist', "[]");
 }
  }
  addtocard(data:any , type:any){
    console.log(data);
    
    
    var setnull ="null"
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
    var prc =0
if(data.product_promotion_price > 0 ){
  prc=data.product_promotion_price 
}
else{
  prc = data.product_price 
}
    const obj = {
      "category_id":data.category_id,
      "category_name":data.category_name,
      "product_id":data.product_id,
      "product_image":data.product_image,
      "product_name":data.product_name,
      "product_price":prc,
      "product_qty":1,
      "product_code":data.product_code,
      "tax_name": data.tax_name,
    "tax_percent": data.tax_percent,
    "unit_code": data.unit_code,
    "unit_name": data.unit_name
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
       this.SaveCart(cartlist,type);
    
    }
     SaveCart(objCart:any,type:any) {
      if(type==="fav"){
        localStorage.setItem('fav', JSON.stringify(objCart));
        this.toastCtrl.create({ duration: 3000, message: "Product remove  Successfull!", position: 'top', }).then(t => t.present())
        this.favlist =objCart
      }
      else{
        localStorage.setItem('cardlist', JSON.stringify(objCart));
        this.toastCtrl.create({ duration: 3000, message: "Product Add Successfull!", position: 'top', }).then(t => t.present())
      
      }
    
    }

    gotoproductdetails(item:any){
      localStorage.setItem('product-details', JSON.stringify(item));
      this.router.navigate(['/product-details']);
    }
  async removeitem  (id:any) {
  const alert = await this.alertController.create({
    header: 'Are you sure you want remove from favorite!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          
        },
      },
      {
        text: 'Remove',
        role: 'confirm',
        handler: () => {
          var n ="null"
          var cartlist = JSON.parse(localStorage.getItem('fav')|| n);
         
          for (let i = 0; i < cartlist.length; i++) {
            if (cartlist[i].product_id === id) {
              cartlist.splice(i, 1);
              this.SaveCart(cartlist,'fav');
             // break;
        
            }    
          }
          if(cartlist.length ===0){
            this.ispasswordconfirm=true;
           }else{
            this.ispasswordconfirm=false;
           }
        },
      },
    ],
    
  });

  await alert.present();
  const { role } = await alert.onDidDismiss();

         
  }
}
