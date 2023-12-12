import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';
import * as numWords from 'num-words';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  imageurl = 'https://annapurnafarms.net/public/images/'
  constructor( private http: HttpClient,  public router: Router,
    private toastCtrl: ToastController,
    private postapi :AdminservicetwoService) { }

  ngOnInit() {
    this.getorderdetails()
   // this.getinnovive()
  }
  order:any
  orderinovice:any
  pdfurl:any
  getorderdetails(){
     var setnull ="null"
    var cat = JSON.parse(localStorage.getItem('orderdetailsid')|| setnull)
    this.pdfurl = `https://annapurnafarms.net/api/saleinvoice/${cat}`;
    this.postapi.orderdetails(cat).subscribe(data => {
      this.order = data;
      this.orderinovice=[this.order[0]]
    console.log(this.order, 'order');
    
    });
  }
  ino:any
  getinnovive(){
    this.postapi.innovice('20').subscribe(data => {
      this.ino = data;
    console.log(this.ino, 'order');
    
    });
  }
  istermstmodal=false;
  isPrivacymodal=false
  termsmodal(t:any){
    if (t==='T') {
      
   
    if( this.istermstmodal == true){
      this.istermstmodal = false;
      setTimeout(() => {
        this.istermstmodal = true;
      }, 100);
    }
    else{
      this.istermstmodal = true;
    }
  }
  }
  
  convertNumberToWords(num: number): string {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num === 0) {
      return 'zero';
    }

    if (num < 10) {
      return ones[num];
    }

    if (num >= 11 && num <= 19) {
      return teens[num - 10];
    }

    const numString = num.toString();
    const numArray = numString.split('').map(Number);

    if (numArray.length === 2) {
      return tens[numArray[0]] + ' ' + ones[numArray[1]];
    }

    if (numArray.length === 3) {
      const hundred = ones[numArray[0]] + ' hundred';
      const rest = this.convertNumberToWords(Number(numArray.slice(1).join('')));
      return rest ? (hundred + ' and ' + rest) : hundred;
    }

    return '';
  }
}
