import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor( private http: HttpClient, 
    private toastCtrl: ToastController,
    public router: Router,
    private postapi :AdminservicetwoService) { }
  email=""
  ngOnInit() {
  }
  data:any
  submit(){
    console.log("")
    if ( this.email === "") {
      this.toastCtrl.create({ duration: 3000, message: "Please provide required value!", position: 'top', }).then(t => t.present())
  
    }
    else{
      
      this.postapi.forgotpass(this.email).subscribe(data => {
        this.data = data;
        if(this.data[0].status=="success"){
          this.toastCtrl.create({ duration: 3000, message: "will sent you a mail !", position: 'top', }).then(t => t.present())
  
        }
        if(this.data[0].status=="fail"){
          this.toastCtrl.create({ duration: 3000, message: "error !", position: 'top', }).then(t => t.present())
  
        }
      //console.log(this.recordproduct,'recordproduct');
      
      });
    }
  }
}
