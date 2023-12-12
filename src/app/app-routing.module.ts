import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'delivery-regi',
    loadChildren: () => import('./delivery-regi/delivery-regi.module').then( m => m.DeliveryRegiPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'choose-interests',
    loadChildren: () => import('./choose-interests/choose-interests.module').then( m => m.ChooseInterestsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'application-form',
    loadChildren: () => import('./application-form/application-form.module').then( m => m.ApplicationFormPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'emp-dashboard',
    loadChildren: () => import('./emp-dashboard/emp-dashboard.module').then( m => m.EmpDashboardPageModule)
  },
  {
    path: 'emp-list',
    loadChildren: () => import('./emp-list/emp-list.module').then( m => m.EmpListPageModule)
  },
  {
    path: 'emp-kpi',
    loadChildren: () => import('./emp-kpi/emp-kpi.module').then( m => m.EmpKpiPageModule)
  },
  {
    path: 'fav-list',
    loadChildren: () => import('./fav-list/fav-list.module').then( m => m.FavListPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'all-product',
    loadChildren: () => import('./all-product/all-product.module').then( m => m.AllProductPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'bag',
    loadChildren: () => import('./bag/bag.module').then( m => m.BagPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'sub-category',
    loadChildren: () => import('./sub-category/sub-category.module').then( m => m.SubCategoryPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'coupon',
    loadChildren: () => import('./coupon/coupon.module').then( m => m.CouponPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
