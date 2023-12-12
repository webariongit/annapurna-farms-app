import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  imageurl = 'https://annapurnafarms.net/public/images/'
  constructor( private toastCtrl: ToastController,) { }
  product:any
  
  productqty:any
  // images = [
  //   { url: 'https://annapurnafarms.net/public/images/app/banner3.png', alt: 'Image 1' },
  //   { url: 'https://annapurnafarms.net/public/images/app/banner4.png', alt: 'Image 1' },
  //   { url: 'https://annapurnafarms.net/public/images/app/banner2.png', alt: 'Image 3' },
  //   {url:'https://annapurnafarms.net/public/images/app/banner1.png' , alt :'image 4'}
  // ];
  productImages:any
  currentImageIndex = 0;
  currentImage:any
  productDetails:any
  guestid:any

  ngOnInit() {
    
    this.productqty=1
     this.product = [JSON.parse(localStorage.getItem('product-details')|| 'null')]
     this.productDetails =this.product[0].product_details
     this.guestid =JSON.parse(sessionStorage.getItem('guestid')|| "1")
     if (this.product[0].product_image && this.product[0].product_image.trim() !== '') {
      // Split the response string into an array of image filenames
      
      const productImageArray =this.product[0].product_image.split(',');
       this.productImages = productImageArray.map((filename:any) => {
        return { url: `${this.imageurl}/product/${filename}` };
      });
    
      console.log(this.productImages);
      var fav = JSON.parse(localStorage.getItem('fav')|| "null")
 // this.cartlistcount=cartlist.length
  if(fav==null){
    localStorage.setItem('fav', "[]");
  }
     //console.log(this.images,"images");
   //  this.images = this.productImages
    //  if (this.product.product_image) {
    //   this.productImages = this.product[0].product_image.split(',');
    }
     console.log(this.product);
     
 
  this.currentImage = this.productImages[this.currentImageIndex];
  this.startAutoSlide()
  }
  nextSlide() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
    this.currentImage = this.productImages[this.currentImageIndex];
  }
  intervalId: any; // Used to store the interval ID
  startAutoSlide() {
    // Set an interval to call nextSlide every 3 seconds (adjust as needed)
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3000 milliseconds (3 seconds)
  }
  addtocard(data:any , type:any){

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
      "product_qty":this.productqty,
      "tax_name": data.tax_name,
    "tax_percent": data.tax_percent,
    "unit_code": data.unit_code,
    "unit_name": data.unit_name
    }
      for (let i = 0; i < cartlist.length; i++) {
        if (cartlist[i].product_name === data.product_name) {
          if (cartlist[i].product_id === data.product_id) {
            cartlist[i].product_qty = data.product_qty;
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

    decrementQty() {
      if(this.productqty >1){
        this.productqty--;
      }
     
    }
    
    incrementQty() {
      this.productqty++;
     // this.updateCart(data);
    }
    
}
