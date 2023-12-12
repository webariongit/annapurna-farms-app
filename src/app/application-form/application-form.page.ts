import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.page.html',
  styleUrls: ['./application-form.page.scss'],
})
export class ApplicationFormPage implements OnInit {
 
  constructor( fb:FormBuilder,
    public router: Router, 
    public formbuider: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private postapi :AuthserviceService) { }
    Userform:any
    wearehouselist:any
    assignuserdata:any
 
  ngOnInit() {
    this.postapi.getwearehouse().subscribe(data => {
      this.wearehouselist=data
      console.log(data);
      
    })
    
 
    this.Userform = this.formbuider.group({
      customer_group_id: 1,
      email: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      name:"text@gmail.com",
      customer_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      tax_no: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pancard: ['', [Validators.required]],
      imgpancard: [''],
      adhaarcard: ['', [Validators.required]],
      imgadhaarcard:this.adharfile,
      gstdeclaration: ['', [Validators.required]],
      imggstdeclaration: this.gstfile,
      fssai: ['', [Validators.required]],
      imgfssai: this.fssaifile,
      warehouse_id: ['', [Validators.required]],
      assign_user_id: ['', [Validators.required]],
      pos: 0,
      password: '12345',
    })
  }
  
  userdata={
    email:"",
    company_name:"",
    customer_name:"",
    name:"",
    phone_number:"",
    tax_no:"",
    address:"",
    city:"",
    state:"",
    postal_code:"",
    country:"",
    pancard:"",
    imgpancard:"",
    adhaarcard:"",
    imgadhaarcard:"",
    gstdeclaration:"",
    imggstdeclaration:"",
    fssai:"",
    imgfssai:"",
    warehouse_id:"",
    assign_user_id:"",
   }
   savedata:any
   base64Image: string | null = null;
   panfile: any ;
   adharfile: File | null = null;
   gstfile: string | null = null;
   fssaifile: string | null = null;
   base64Url: string | null = null
   
   
   onFilechange(event: any,filename:any) {
    const file: File = event.target.files[0];
    var reader: FileReader = new FileReader();

    var self = this; // create self with right this
    reader.onload = function (readerEvt: any) {
        var binaryString = readerEvt.target.result;
        self.resultimage(binaryString,filename)
        //self.base64Url = binaryString; // using self instead this
        // self.mimeType = self.base64Url.substring(self.base64Url.lastIndexOf("data") + 5, self.base64Url.lastIndexOf(";"));
        // self.base64Url = self.base64Url.substring(self.base64Url.lastIndexOf("base64") + 7);
        // self.addContentAttachment(self.mimeType, self.base64Url);
    };

    reader.readAsDataURL(file);

    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

}
  
  resultimage(result:any,filename:any){
    console.log(result);
    result.toString().replace(/^data:(.*,)?/, '')
    if(filename=="imgpancard"){
      this.userdata.imgpancard = result
    }
    if(filename=="imgadhaarcard"){
      this.userdata.imgadhaarcard =result
    }
    if(filename =="imggstdeclaration"){
      this.userdata.imggstdeclaration = result
    }
    if(filename=="imgfssai"){
      this.userdata.imgfssai= result
    }
   }
  
   onChange(CValue:any) {
      this.postapi.assignuser(CValue).subscribe(data => {
       this.assignuserdata=data
     })
    console.log(this.assignuserdata ,"assignuserdata");
  }
   submit(){
    
   // const formData = new FormData();
    //this.Userform.append('imgfssai', this.Userform.get('imgfssai').value)
    console.log(this.Userform);
    this.postapi.saveapplicationform(this.Userform.value).subscribe(data => {
      this.savedata =data
      if( this.savedata[0].status=="success"){
        
      this.toastCtrl.create({ duration: 3000, message: " Successfull!", position: 'top', }).then(t => t.present())
        //this.router.navigate(['/user-dashboard']);
       }
      if( this.savedata.status=="fail"){
        this.toastCtrl.create({ duration: 3000, message: "fail unSuccessfull!", position: 'top', }).then(t => t.present())
       }
    
    })
   }
}
