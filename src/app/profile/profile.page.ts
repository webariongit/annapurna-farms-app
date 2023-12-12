import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';
// import { CameraSource } from '@capacitor/camera';
import {  Camera, CameraResultType, CameraSource,  } from '@capacitor/camera';
//import {  PermissionsRequestResult, PermissionType } from '@capacitor/core';
//import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import type { PermissionState } from '@capacitor/core';

// const { Camera } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public router: Router,  public formbuider: FormBuilder,  private postapi :AdminservicetwoService,
    private alertController: AlertController, private toastCtrl: ToastController, 
   ) { }
  profile:any
  name:any
  date:any
  isModalOpen = false;
  Userform:any

 
  ngOnInit() {
    this.setpic()
    this.date = new Date()
    var setnull ="null"
     this.profile = JSON.parse(localStorage.getItem('profile')|| setnull)
      if (this.profile!=null) {
      this.name=  this.profile[0].data[0].name
      }
      this.Userform = this.formbuider.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      })
  }
  userdata={
    password:"",
    confirmPassword:"",
   }
  openmodal(){
    if( this.isModalOpen == true){
      this.isModalOpen = false;
      setTimeout(() => {
        this.isModalOpen = true;
      }, 100);
    }
    else{
      this.isModalOpen = true;
    }
   
  }
  setclose(){
    this.isModalOpen = false;
  }
  async logout(){
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
            this.toastCtrl.create({ duration: 4000, message: "logout sucessfully!", position: 'top', }).then(t => t.present())
              
            this.router.navigate(['/login']);
            //window.open("https://play.google.com/store/apps/details?id=com.zapsrewardss.customer");
          },
        },
      ],
      
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  
   
  }
  ispasswordconfirm: boolean = false;
  re:any
  changepass(){
    if(this.userdata.password ==="" || this.userdata.confirmPassword ==="" ){
      this.toastCtrl.create({ duration: 3000, message: "Please provide all the required values!", position: 'top', }).then(t => t.present())
      return
    }
    if(this.userdata.password != this.userdata.confirmPassword ){
      this.ispasswordconfirm=true;
      return
    }
    var data =JSON.parse(localStorage.getItem('profile')||'null')
    const obj ={
      uid:data[0].data[0].id ,
      password:this.Userform.value.password
    }

    this.postapi.changepassword(obj).subscribe(data => {
      this.re =data
      if(this.re[0].status ==="success" ){
        this.toastCtrl.create({ duration: 3000, message: "password chnage successfully!", position: 'top', }).then(t => t.present())
      
      }
      if(this.re[0].status ==="fail" ){
        this.toastCtrl.create({ duration: 3000, message: "fail to change password!", position: 'top', }).then(t => t.present())
      
      }
    // console.log(data);
     
    })
  }
  profilePic:any
  async openGallery(type:any) {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
  if(type==='p'){
    this.postapi.setprofilepic(image.dataUrl).subscribe(data => {
      this.re =data
    })
    
    localStorage.setItem('profilepic', JSON.stringify(image.dataUrl));
  }
  else{
    localStorage.setItem('backprofilepic', JSON.stringify(image.dataUrl));

  }
   
   
    
    this.setpic()
    // Optionally, you can save the image locally
    // const savedImage = await Filesystem.writeFile({
    //   path: 'profile-pic.jpg',
    //   data: image.dataUrl,
    //   directory: Directory.Data,
    //   encoding: Encoding.DataUrl,
    // });
  }
  backprofilepic:any
  setpic(){
    var backprofilepic = JSON.parse(localStorage.getItem('backprofilepic')|| 'null')
    var pic  = JSON.parse(localStorage.getItem('profilepic')|| 'null')
    if(pic!='null'){
      this.profilePic = pic
    }
    if(backprofilepic!='null'){
      this.backprofilepic = backprofilepic
    }
  }
}
