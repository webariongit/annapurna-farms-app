import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  selectedOption: string = ''; 
  totalamount:any
  cartlist:any
  productids:any
  profile:any
  address:any
  constructor( private toastCtrl: ToastController, private http: HttpClient,  public router: Router, 
    private postapi :AuthserviceService) { }
    coupandiscount:any
    totalgst:any
    itempriceone:any
    shippingcharge:any
  ngOnInit() {

    var setnull ='0'
     this.profile = JSON.parse(localStorage.getItem('profile')|| setnull)
    this.totalamount = JSON.parse(localStorage.getItem('itemprice')|| setnull)
    this.coupandiscount = JSON.parse(localStorage.getItem('coupandiscount')|| setnull)
    this.totalgst = JSON.parse(localStorage.getItem('totalgst')|| setnull)
    this.itempriceone = JSON.parse(localStorage.getItem('itempriceone')|| setnull)
    
    var setnull ="null"
 this.cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
 var arr=[]
 this.shippingcharge=0
 for(var i=0 ; i < this.cartlist.length; i++){
  arr.push(this.cartlist[i].product_id)
  this.shippingcharge += this.cartlist[i].product_qty
 }
 this.productids=arr
 console.log('Selected Option:',this.productids);
  }

  selectOption(option: string) {
    if (this.selectedOption === option) {
      // If the clicked option is already selected, unselect it
      this.selectedOption = '';
    } else {
      // Otherwise, select the clicked option
      this.selectedOption = option;
    }
    console.log('Selected Option:', this.selectedOption);
    // You can perform further actions based on the selected option here
  }
  order:any
  arrrr:any
  orderconfirmtwo(){
   const  subtotal=[]  , qty =[] , prdid=[],productprice=[]
 
   const imei_number=[]
   const product_batch_id=[]
   const product_code=[]
   const sale_unit=[]
   const   discount=[]
   const tax_rate =[]
   const tax =[]
   var total_qty=0
for (let i = 0; i < this.cartlist.length; i++) {
      qty.push(this.cartlist[i].product_qty) 
      productprice.push(this.cartlist[i].product_price)
  
  subtotal.push(this.cartlist[i].product_price *this.cartlist[i].product_qty)

  product_batch_id.push("null")
  product_code.push(this.cartlist[i].product_code)
   sale_unit.push(this.cartlist[i].unit_name)
   discount.push(0)
    tax_rate.push(this.cartlist[i].tax_percent || 0)
    var taxxx
    if (this.cartlist[i].tax_name=='GST') {
       taxxx= 0
    }
    tax.push(taxxx)
    imei_number.push(null)
    total_qty=+ this.cartlist[i].product_qty
}
// var sum
// var  grandtol:Number=0
// var s=tax_rate, r=productprice

//console.log(sum );
    
    var obj = {
      "user_id": this.profile[0].data[0].id ,
      "created_at":  this.getdate(),
      "reference_no": 'S-'+new Date().getTime(),
      "customer_id": this.profile[0].data[0].customer_id,
      "warehouse_id": this.profile[0].data[0].warehouse_id,
      "biller_id": this.profile[0].data[0].biller_id || 1 ,
      "currency_id": "1",
      
      "exchange_rate": "80",
      "product_code_name": null,
      "qty": qty,
      "product_batch_id": product_batch_id,
      "product_code": product_code,
      "product_id": this.productids,
      "sale_unit": sale_unit,
      "net_unit_price": productprice,
      "discount": discount,
      "tax_rate": tax_rate,
      "tax": tax,
      "subtotal":subtotal,
      "imei_number": imei_number,
      "total_qty": this.shippingcharge, //total_qty,
      "total_discount": ''+this.coupandiscount+'',
      "total_tax": this.summ(tax_rate).toString(),
      "total_price": this.summ(productprice).toString(),
      "item": "3",
      "order_tax": "0.000",
      "grand_total": this.summ(productprice).toString(),
      "used_points": null,
      "pos": "0",
      "coupon_active": "0",
      "order_tax_rate": "0",
      "order_discount_type": "Flat",
      "order_discount_value": null,
      "order_discount": "0",
      "shipping_cost": this.shippingcharge,
      "sale_status": "2",
      "payment_status": "1",
      "paid_by_id": "1",
      "paying_amount": null,
      "paid_amount": null,
      "gift_card_id": null,
      "cheque_no": null,
      "payment_note": null,
      "sale_note": null,
      "staff_note": this.address
    }

    this.postapi.order(obj).subscribe(data => {
      this.order =data
      if( this.order[0].status=="success"){
        localStorage.removeItem('coupandiscount')
        localStorage.setItem('cardlist', "[]");
        var apply = JSON.parse(localStorage.getItem('appliedcoupan')|| '0')
        var appliedflag = JSON.parse(localStorage.getItem('appliedflag')|| '0')
        // const coupanobj = {
        //   "applied_id":apply.id,
        // }
        for (let i = 0; i < appliedflag.length; i++) {
          if (appliedflag[i].id === apply.id) {
               // obj.product_qty = cartlist[i].product_qty+1
               appliedflag.splice(i, 1);
          }
        }
        appliedflag.push(apply);
      localStorage.setItem('appliedflag',JSON.stringify(appliedflag));
       
this.toastCtrl.create({ duration: 3000, message: "Order Confirm Successfull!", position: 'top', }).then(t => t.present())
this.router.navigate(['/user-dashboard']);
       }
      if( this.order.status=="fail"){
        this.toastCtrl.create({ duration: 3000, message: "Login unSuccessfull!", position: 'top', }).then(t => t.present())
       }
    
    })


  }

//   getdate(){
//     const today = new Date();
// const yyyy = today.getFullYear();
// let mm = today.getMonth() + 1; // Months start at 0!
// let dd = today.getDate();
// let dd1,mm1;
// if (dd < 10) dd1 = '0' + dd;
// if (mm < 10) mm1 = '0' + mm;

// const formattedToday = dd1 + '-' + mm1 + '-' + yyyy;
// return formattedToday
//   }
getdate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();
  let dd1: string, mm1: string;

  if (dd < 10) {
    dd1 = '0' + dd;
  } else {
    dd1 = dd.toString();
  }

  if (mm < 10) {
    mm1 = '0' + mm;
  } else {
    mm1 = mm.toString();
  }

  const formattedToday = dd1 + '-' + mm1 + '-' + yyyy;
  return formattedToday;
}

  summ(arr:any){
    var sum =0
    for(var i=0 ; i< arr.length; i ++){
      sum += parseFloat(arr[i]) 
    }
   // arr.forEach((a:any) => sum =+ a.value);
    return sum 
    //r.forEach(a => grandtol =+ a.value);
  }
  items = [
    { id: 1, name: 'cash on delivery (COD)' },
    { id: 2, name: ' online payment(UPI) ' },
  
    // Add more items as needed
  ];
  istermstmodal=false;
  isPrivacymodal=false
 
  otherInputValue:any
  showOtherInput: boolean = false;
  selectedItemId: number | null = null; 
  onRadioChange() {
    if (this.selectedItemId === 9) {
      this.showOtherInput = true;
    } else {
      this.showOtherInput = false;
    }
  }
  orderconfirm(){
   
   
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

  submit(){
    // if (this.selectedItemId !== null) {
      const selectedItem = this.items.find(item => item.id === this.selectedItemId );
    
      if (selectedItem) {
        if (this.selectedItemId==1) {
          this.istermstmodal = false;
          this.orderconfirmtwo()
        }
        else{
          this.toastCtrl.create({ duration: 3000, message: " No Payment option is selected", position: 'top', }).then(t => t.present())
        }
      }
      else{
        this.toastCtrl.create({ duration: 3000, message: " No Payment option is selected", position: 'top', }).then(t => t.present())
    
      // }  
    }}
}
