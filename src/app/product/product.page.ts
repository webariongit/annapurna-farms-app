import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from '../adminservice/authservice.service';
import { environment } from 'src/environments/environment';
import { AlertController, IonicSlides, MenuController, ToastController } from '@ionic/angular';
import { Swiper } from 'swiper';
import { Router } from '@angular/router';
 import { Geolocation } from '@capacitor/geolocation';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  imageurl = 'https://annapurnafarms.net/public/images/'
  
  constructor(
     private http: HttpClient, private alertController: AlertController,
     private toastCtrl: ToastController,private postrate : AdminservicetwoService,
     public Menu: MenuController,public router: Router,
     private postapi :AuthserviceService) { }
  product:any
  category:any
  cartlistcount:any
  @ViewChild('swiper') swiperRef?: ElementRef;
  swiperModules = [IonicSlides];
  swiper?: Swiper;
 
  

  
address:any
guestid:any
  ngOnInit() {
     var p = JSON.parse(localStorage.getItem('profile')|| 'null')
     if(p!=null){
      this.address=p[0].data[0].city +" "+  p[0].data[0].address

     }
     this.guestid =JSON.parse(sessionStorage.getItem('guestid')|| "1")

    this.startAutoSlide()
   
    this.getlocation()
    this.swiper = new Swiper('.swiper-container', {
      // Add your Swiper options here
    });
    this.getbrand()

   // localStorage.setItem('fav', "[]");
    this.getproduct()
    this.getCategory()
    var setnull ="null"
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
    
   // this.cartlistcount=cartlist.length
    if(cartlist==null){
      localStorage.setItem('cardlist', "[]");
    }
    this.setpic()
  }
  profilePic:any
  setpic(){
    var pic  = JSON.parse(localStorage.getItem('profilepic')|| 'null')
    if(pic!='null'){
      this.profilePic = pic
    }
  }
  latitude: any;
  longitude: any;
  async getlocation(){
    Geolocation.requestPermissions()
    const coordinates = await Geolocation.getCurrentPosition();
    
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      const address = await this.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude);
     // this.getAddress(this.latitude, this.longitude);
    //  this.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+this.latitude+","+this.longitude+"&sensor=true").subscribe((result:any)=>{

    //  })
    console.log('Current address:', address);
    console.log('Current position:', coordinates);
  }
  getcurrentlocation(){
    return Geolocation.getCurrentPosition().then(coordinates=>{
      //localStorage.setItem('geocoordinates', JSON.stringify(coordinates));
      
      return coordinates;
    })
    .catch(e=>{
      throw(e)
    })
  }

  requestpermission(){
    return Geolocation.requestPermissions().then(status=>{
      return status;
    })
    .catch(e=>{
      throw(e)
    })
  }

  
  openMenu() {
    this.router.navigate(['/profile']);
   // this.Menu.open();
  }
  menuclose() {
    this.Menu.close();
  }
  recordproduct:any
  popularproductdata:any
  getproduct(){
    this.postapi.getfproduct().subscribe(data => {
      this.product = data;
    console.log(this.product);
    
    });
    this.postapi.recentproduct().subscribe(data => {
      this.recordproduct = data;
    console.log(this.recordproduct,'recordproduct');
    
    });
    this.postapi.popularproduct().subscribe(data => {
      this.popularproductdata = data;
    console.log(this.popularproductdata,'popularproductdata');
    
    });

  }
  getCategory(){
    this.postapi.category().subscribe(data => {
      this.category = data
      //this.category.splice(3)
    console.log(this.category, 'category');
    
    });
  }
  brands:any
  getbrand(){
    this.postapi.getbrands().subscribe(data => {
      this.brands = data
      //this.category.splice(3)
    console.log(this.brands, 'brands');
    
    });
  }
  gotoproductdetails(item:any){
    localStorage.setItem('product-details', JSON.stringify(item));
    this.router.navigate(['/product-details']);
  }

  gottosubcategory(cat:any){
    localStorage.setItem('sub-categoryid', JSON.stringify(cat));
   // this.router.navigate(['/sub-category']);
    this.router.navigate(['/all-product']);
  }
  addtocard(data:any , type:any){

var setnull ="null"
var cartlist
if(type==="cart"){
  cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
}else{
  cartlist = JSON.parse(localStorage.getItem('fav')|| setnull)

}
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

viewallproduct(){
  localStorage.removeItem('subproduct');
  this.router.navigate(['/all-product']);
}
 SaveCart(objCart:any,type:any) {
  if(type==="fav"){
    localStorage.setItem('fav', JSON.stringify(objCart));
    this.toastCtrl.create({ duration: 3000, message: "Product Added to favroite Successfull!", position: 'top', }).then((t:any) => t.present())
  
  }
  else{
    localStorage.setItem('cardlist', JSON.stringify(objCart));
    this.toastCtrl.create({ duration: 3000, message: "Product Add Successfull!", position: 'top', }).then((t:any) => t.present())
  
  }

}

imagesarr:any

images = [
  { url: 'https://annapurnafarms.net/public/images/app/banner3.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/banner4.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/banner2.png', alt: 'Image 3' },
  {url:'https://annapurnafarms.net/public/images/app/banner1.png' , alt :'image 4'}
];

secondimages = [
  { url: 'https://annapurnafarms.net/public/images/app/banner5.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/banner6.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/banner7.png', alt: 'Image 3' },
  {url:'https://annapurnafarms.net/public/images/app/banner8.png' , alt :'image 4'}
];
promoimage = [
  { url: 'https://annapurnafarms.net/public/images/app/promotion1.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/promotion4.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/promotion2.png', alt: 'Image 3' },
  {url:'https://annapurnafarms.net/public/images/app/promotion3.png' , alt :'image 4'}
];
popularimage=[
  { url: 'https://annapurnafarms.net/public/images/app/promotion5.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/promotion6.png', alt: 'Image 1' },
  { url: 'https://annapurnafarms.net/public/images/app/promotion7.png', alt: 'Image 3' },
 // {url:'https://annapurnafarms.net/public/images/app/promotion8.png' , alt :'image 4'}
]
currentImageIndex = 0
index=0
currentImage = this.images[this.currentImageIndex];
secoundcurrent=this.secondimages[this.index]
//this.imagesarr=this.images[this.currentImageIndex];
prevSlide() {
  this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  this.currentImage = this.images[this.currentImageIndex];
}

nextSlide() {
  this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  this.currentImage = this.images[this.currentImageIndex];

  this.index = (this.index + 1) % this.secondimages.length;
  this.secoundcurrent = this.secondimages[this.index];

}
intervalId: any; // Used to store the interval ID
startAutoSlide() {
  // Set an interval to call nextSlide every 3 seconds (adjust as needed)
  this.intervalId = setInterval(() => {
    this.nextSlide();
  }, 3000); // 3000 milliseconds (3 seconds)
}
async reverseGeocode(lat: number, lng: number) {
 // const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=YOUR_OPENCAGE_API_KEY`;
// const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
 //const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`;
 const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

  this.http.get(apiUrl).subscribe((result:any)=>{
console.log(result,"addresssss");

})
}
ngDoCheck() {
  this.setpic()
  // setTimeout(() => {
  //   this.nextSlide()
  // }, 5000);
 }

 // Define a function to handle image errors
handleImageError(item: any) {
  item.url = null;
  
}
handleImageErrorc(item:any){
  item.url = null
}

async refreshData(event: any) {
  location.reload()}

  async logout(){
    this.Menu.close();
    const alert = await this.alertController.create({
      header: 'Are you sure you want to logout!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'logout',
          role: 'confirm',
          handler: () => {
            localStorage.removeItem('profile')
            this.toastCtrl.create({ duration: 4000, message: "logout sucessfully!", position: 'top', }).then((t:any) => t.present())
              
            this.router.navigate(['/login']);
            //window.open("https://play.google.com/store/apps/details?id=com.zapsrewardss.customer");
          },
        },
      ],
      
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  
  }

  // slides = [
  //   {img: "https://annapurnafarms.net/public/images/app/promotion7.png"},
  //   {img: "http://placehold.it/350x150/111111"},
  //   {img: "https://annapurnafarms.net/public/images/app/promotion7.png"},
  //   {img: "http://placehold.it/350x150/666666"}
  // ];
  // slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  // addSlide() {
  //   this.slides.push({img: "http://placehold.it/350x150/777777"})
  // }
  
  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }
  
  // slickInit(e:any) {
  //   console.log('slick initialized');
  // }
  
  // breakpoint(e:any) {
  //   console.log('breakpoint');
  // }
  
  // afterChange(e:any) {
  //   console.log('afterChange');
  // }
  
  // beforeChange(e:any) {
  //   console.log('beforeChange');
  // }
  slidesss = [
    { img: 'https://annapurnafarms.net/public/images/app/promotion7.png', alt: 'Slide 1' },
    { img: 'assets/c1.png', alt: 'Slide 2' },
    { img: 'https://annapurnafarms.net/public/images/app/promotion7.png', alt: 'Slide 3' },
    { img: 'https://annapurnafarms.net/public/images/app/promotion7.png', alt: 'Slide 3' },
  ];

  // Slick carousel configuration
  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // dots: true,
    // infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
  };
  userRating: number = 0;
  userReview: string = '';
  showRatingPopup: boolean = false;
  openRatingPopup(rating: number) {
    this.userRating = rating;
    this.showRatingPopup = true;
  }

  closeRatingPopup() {
    this.showRatingPopup = false;
  }

  submitRatingAndReview() {
    // Send the userRating and userReview to your API
    var p = JSON.parse(localStorage.getItem('profile')|| 'null')
    
    const data = {
      uid: p[0].data[0].id,
      rating: this.userRating,
     // review: this.userReview,
    };
    this.postrate.rateus(data).subscribe((result:any) => {
      this.toastCtrl.create({ duration: 3000, message: "Review submitted!", position: 'top', }).then((t:any) => t.present())
           
    })
    // Send the data to your API using HTTP requests, such as HttpClient in Angular
    // Example: this.http.post('/app-rating', data).subscribe(...);
    //post : /app-rating  {"uid": 1, "rating":4}

    // Close the rating popup after submission
    this.showRatingPopup = false;
  }
}
