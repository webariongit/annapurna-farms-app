import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public nav: NavController,public router: Router,) {}

  ngOnInit() {
    setTimeout(() => {
      this.staylogin()
      //this.nav.navigateForward('login');
    }, 3000);
  }
  authenticated:any
	staylogin() {
		var d="null"
		
			this.authenticated =JSON.parse(localStorage.getItem('profile')|| d);
			if(this.authenticated !==null && this.authenticated !=='null'){
			
				this.router.navigate(['/user-dashboard']);
			} else {
				this.router.navigate(['/login']);
			}
    }
}
