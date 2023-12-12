import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthserviceService } from '../adminservice/authservice.service';
import { AdminservicetwoService } from '../adminservice/adminservicetwo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.page.html',
  styleUrls: ['./sub-category.page.scss'],
})
export class SubCategoryPage implements OnInit {

  imageurl = 'https://annapurnafarms.net/public/images/'
  constructor(  private http: HttpClient, 
    public router: Router,
    private postapi :AdminservicetwoService) { }
    category:any
  ngOnInit() {
    this.getCategory()
  }
  getCategory(){
    var setnull ="null"
    var cat = JSON.parse(localStorage.getItem('sub-categoryid')|| setnull)
    this.postapi.subcategory(cat).subscribe(data => {
      this.category = data;
    console.log(this.category, 'category');
    
    });
  }
  gotoallproduct(item:any){
  localStorage.setItem('subproduct', JSON.stringify(item));
  this.router.navigate(['/all-product']);
}
}
