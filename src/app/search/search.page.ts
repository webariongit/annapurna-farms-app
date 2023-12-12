import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchTerm =""
  term =""
  
  imageurl = 'https://annapurnafarms.net/public/images/'
  constructor(
     private http: HttpClient, public router: Router,
     private toastCtrl: ToastController,
     private postapi :AuthserviceService) { }
    // @ViewChild(IonSearchbar) myInput: IonSearchbar;
  product:any
  category:any
  cartlistcount:any
  searchvalue: any
  guestid:any
  ngOnInit() {
   // setTimeout(() => { this.myInput.setFocus(); }, 150);
    localStorage.setItem('fav', "[]");
    this.guestid =JSON.parse(sessionStorage.getItem('guestid')|| "1")
    this.getproduct()
   
    var setnull ="null"
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
   // this.cartlistcount=cartlist.length
    if(cartlist==null){
      localStorage.setItem('cardlist', "[]");
    }
  }
 
  productmain:any

  getproduct(){
    this.postapi.getproduct().subscribe(data => {
      this.product = data;
      this.productmain = data;
    console.log(this.product);
    
    });
  }
  gotoproductdetails(item:any){
    localStorage.setItem('product-details', JSON.stringify(item));
    this.router.navigate(['/product-details']);
  }
  filterTextChanged: any;
  // debounce filter text changes
  onFilterTextChanged(filterText: any) {
    this.product = this.productmain.filter((entry: any) => {
      // Check if filterText is null or has less than 3 characters
      if (!filterText || filterText.trim().length < 3) {
        // Return true to show all data
        return true;
      } else if (filterText.length === 1) {
        // Check if filterText is a single character (e.g., 'A', 'B')
        return entry.product_name.charAt(0).toUpperCase() === filterText.toUpperCase();
      } else if (entry.product_name.toUpperCase().includes(filterText.toUpperCase())) {
        // Check if filterText is part of the product name (case-insensitive)
        return true;
      }
    
      // If none of the above conditions match, exclude the entry
      return false;
    });
    

    
    // if (this.filterTextChanged.observers.length === 0) {
    //   this.filterTextChanged
    //     .pipe(debounceTime(1000), distinctUntilChanged())
    //     .subscribe(filterQuery => {
    //       this.loadData(filterQuery);
    //     });
    // }
    //this.filterTextChanged.next(filterText);
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
