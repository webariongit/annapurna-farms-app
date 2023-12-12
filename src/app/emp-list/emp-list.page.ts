import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../adminservice/authservice.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.page.html',
  styleUrls: ['./emp-list.page.scss'],
})
export class EmpListPage implements OnInit {

  constructor( private postapi :AuthserviceService) { }
  list:any
  ngOnInit() {
    this.postapi.emplist().subscribe(data => {
      this.list = data;
      console.log(this.list);
      
    });
  }

}
