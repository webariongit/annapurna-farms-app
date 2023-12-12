import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.page.html',
  styleUrls: ['./emp-dashboard.page.scss'],
})
export class EmpDashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  route(r:any){
if (r=='create') {
  this.router.navigate(['/application-form']);
}
if (r=='list') {
  this.router.navigate(['/emp-list']);
}
if (r=='kpi') {
  this.router.navigate(['/emp-kpi']);
}
  }
}
