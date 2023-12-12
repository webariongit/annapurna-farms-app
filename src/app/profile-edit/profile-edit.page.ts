import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  constructor(public router: Router,  public formbuider: FormBuilder,  private postapi :AdminservicetwoService,
    private alertController: AlertController, private toastCtrl: ToastController) { }
  userdata={
    name:"",
    email:"",
    phone:"",
   }
   
   Userform:any
   
  ngOnInit() {
   
    this.Userform = this.formbuider.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
     
    })

    var data =JSON.parse(localStorage.getItem('profile')||'null')
    this.userdata.name=data[0].data[0].name
    this.userdata.email=data[0].data[0].email
    this.userdata.phone=data[0].data[0].phone
  }
  changepass(){
    this.toastCtrl.create({ duration: 3000, message: "Profile is not editable!", position: 'top', }).then(t => t.present())
      
  }
}
