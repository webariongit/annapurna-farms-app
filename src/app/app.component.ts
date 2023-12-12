import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router,  private platform: Platform, @Optional() private routerOutlet: IonRouterOutlet,
  ){

    this.platform.backButton.subscribeWithPriority(-1, () => {
      // Check if the user is logged in by checking the presence of the token in local storage
      var d="null"
      const token = JSON.parse(localStorage.getItem('token')|| d);
      const isLoggedIn = !!token;
  
      if (isLoggedIn && this.routerOutlet && this.routerOutlet.canGoBack()) {
        // If the user is logged in and the router outlet can go back, navigate back
        this.routerOutlet.pop();
      } 
      if (window.location.pathname == "/signin") {
        App.exitApp();
      }
      if (window.location.pathname == "/signup") {
        App.exitApp();
      }
      if (window.location.pathname == "/user-dashboard") {
        App.exitApp();
      }
      if (window.location.pathname == "/login") {
        App.exitApp();
      }
      else {
        // If the user is not logged in or the router outlet cannot go back, exit the app
        this.routerOutlet.pop();
      }
    });
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
showSplash = true;
ngOnInit() {
  //this.staylogin()
  var setnull ="null"
  var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
  var appliedflag = JSON.parse(localStorage.getItem('appliedflag')|| setnull)
  var fav = JSON.parse(localStorage.getItem('fav')|| setnull)
 // this.cartlistcount=cartlist.length
  if(cartlist==null){
    localStorage.setItem('cardlist', "[]");
  }
  if(appliedflag==null){
    localStorage.setItem('appliedflag', "[]");
  }
  if(fav==null){
    localStorage.setItem('fav', "[]");
  }
  //this.router.navigate(['/login']);
}
}
