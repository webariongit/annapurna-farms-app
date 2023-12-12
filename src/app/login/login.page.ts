import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    fb:FormBuilder,
    public router: Router, 
    public formbuider: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private postapi :AuthserviceService) { }
    Userform:any
  ngOnInit() {
    this.Userform = this.formbuider.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
   
  }
  userdata={
    email:"",
    password:"",
   }
   showPassword: boolean = false;

   togglePasswordVisibility() {
     this.showPassword = !this.showPassword;
   }
  authdata:any
  signin(){
    var frm = this.Userform
    if(!frm.valid){
      this.toastCtrl.create({ duration: 4000, message: "Please provide all the required values!", position: 'top', }).then(t => t.present())
      return;
    }
    const auth = {email: frm.value.email,password: frm.value.password}
    console.log(auth);
    
    this.postapi.loginapi(auth).subscribe(data => {
      this.authdata = data;
      console.log(data);
     if(this.authdata[0].status=="success"){
      localStorage.setItem('profile', JSON.stringify(this.authdata));
      localStorage.setItem('wid', JSON.stringify(this.authdata[0].data[0].warehouse_id));
      // localStorage.setItem('isLogin', 'true')
      // if(this.authdata[0].data[0].role_id===7){
      //   this.router.navigate(['/emp-dashboard']);
        
      // }
      if(this.authdata[0].data[0].role_id===8){
      this.toastCtrl.create({ duration: 3000, message: "Login Successfull!", position: 'top', }).then(t => t.present())
       sessionStorage.removeItem('guestid')
        this.router.navigate(['/user-dashboard']);
      }
      if(this.authdata[0].data[0].role_id!=8){
        this.toastCtrl.create({ duration: 3000, message: "Check your email & password!", position: 'top', }).then(t => t.present())

      }
    }
     
    
    
     if(this.authdata[0].status=="fail"){
      this.toastCtrl.create({ duration: 3000, message: "Check your email & password!", position: 'top', }).then(t => t.present())
     }
    
    });
  }
  Guestlogin(){
    localStorage.setItem('wid', '1');
    sessionStorage.setItem('guestid', '0');
    this.router.navigate(['/user-dashboard']);
  }
}
