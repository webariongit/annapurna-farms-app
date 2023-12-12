import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  activeTab: string = 'home'; // Initialize the active tab as 'home'
  constructor(private router: Router) { }
  cartlistcount:any
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveTab();
      }
    });
    var setnull ="null"
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
    this.cartlistcount=cartlist.length
    // if (window.location.pathname == "/signin") {
      
    // }
   
  }

  ngDoCheck() { 
    // if (location.pathname=='/user-dashboard') {
    //   this.activeTab = 'home';
    // } 
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.updateActiveTab();
    //   }
    // });
    // if (window.location.pathname == "/user-dashboard") {
      // #06a058
    // }
    var setnull ="null"
    var cartlist = JSON.parse(localStorage.getItem('cardlist')|| setnull)
    this.cartlistcount=cartlist.length
  }
  clickedItems: string[] = [];

  // onItemClick(itemId: string) {
  //   const index = this.clickedItems.indexOf(itemId);
    
  //   if (index === -1) {
  //     this.clickedItems.push(itemId);
  //   } else {
  //     this.clickedItems.splice(index, 1);
  //   }
  // }

  // isItemClicked(itemId: string): boolean {
  //   this.updateActiveTab()
  //   return this.clickedItems.includes(itemId);
  // }
  updateActiveTab() {
    const url = this.router.url;
    if (url.includes('/user-dashboard')) {
      this.activeTab = 'home';
    } else if (url.includes('/fav-list')) {
      this.activeTab = 'heart';
    } else if (url.includes('/cart')) {
      this.activeTab = 'cart';
    } else if (url.includes('/bag')) {
      this.activeTab = 'bag';
    }
      else if (url.includes('/profile')) {
      this.activeTab = 'menu';
    }
    else{
      
    }
  }

  onItemClick(tab: string) {
    this.activeTab = tab;
    switch (tab) {
      case 'home':
        this.router.navigate(['/user-dashboard']);
        break;
      case 'cart-tab':
        this.router.navigate(['/cart']);
        break;
      case 'heart':
        this.router.navigate(['/fav-list']);
        break;
      case 'bag':
        this.router.navigate(['/bag']);
        break;
        case 'menu':
          this.router.navigate(['/profile']);
          break;
    }
  }
}
