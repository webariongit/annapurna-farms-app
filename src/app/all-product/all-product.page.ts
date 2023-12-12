import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';
import { Router } from '@angular/router';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.page.html',
  styleUrls: ['./all-product.page.scss'],
})
export class AllProductPage implements OnInit {

  imageurl = 'https://annapurnafarms.net/public/images/'
  constructor(
     private http: HttpClient, public router: Router,
     private toastCtrl: ToastController,
     private postapi :AuthserviceService, private getapi :AdminservicetwoService) { }
  product:any
  category:any
  cartlistcount:any
  selectedCategoryId: any;
  guestid:any
  ngOnInit() {
    
    localStorage.setItem('fav', "[]");
    this.guestid =JSON.parse(sessionStorage.getItem('guestid')|| "1")
    this.getCategory()
    //this.getproduct()
    var setnull ="null"
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
   // this.cartlistcount=cartlist.length
    if(cartlist==null){
      localStorage.setItem('cardlist', "[]");
    }
  }
  getCategory(){
    var setnull ="null"
    var cat = JSON.parse(localStorage.getItem('sub-categoryid')|| setnull)
    this.getapi.subcategory(cat).subscribe(data => {
      this.category = data;
      
    
      this.getproductlist(this.category[0].category_id)
    console.log(this.category, 'category');
    
    });
  }
  ispasswordconfirm: boolean = false;
  getproductlist(id:any){
    this.selectedCategoryId = id 
    //var setnull ="null"
    //var cat = JSON.parse(localStorage.getItem('subproduct')|| setnull)
    
    this.postapi.getproduct().subscribe(data => {
      this.product = data;
      if(id!=null){
            
    this.product = this.product.filter((entry :any)=> 
      entry.category_id == id);
        this.product.filter
      }
      if(this.product.length ===0){
        this.ispasswordconfirm=true;
       }else{
        this.ispasswordconfirm=false;
       }
    console.log(this.product);
    
    });
  }
  gotoproductdetails(item:any){
    localStorage.setItem('product-details', JSON.stringify(item));
    this.router.navigate(['/product-details']);
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
        this.toastCtrl.create({ duration: 3000, message: "Product Added to favroite Successfull!", position: 'top', }).then(t => t.present())
      
      }
      else{
        localStorage.setItem('cardlist', JSON.stringify(objCart));
        this.toastCtrl.create({ duration: 3000, message: "Product Add Successfull!", position: 'top', }).then(t => t.present())
      
      }
    
    }
}
