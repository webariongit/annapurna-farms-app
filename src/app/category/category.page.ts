import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  imageurl = 'https://annapurnafarms.net/public/images/'
  constructor(  private http: HttpClient, 
    private toastCtrl: ToastController,public router: Router,
   
    private postapi :AuthserviceService) { }
    category:any
  ngOnInit() {
    this.getCategory()
  }
  getCategory(){
    this.postapi.category().subscribe(data => {
      this.category = data;
    console.log(this.category, 'category');
    
    });
  }
  gottosubcategory(cat:any){
    localStorage.setItem('sub-categoryid', JSON.stringify(cat));
    //this.router.navigate(['/sub-category']);
    this.router.navigate(['/all-product']);
  }
}
