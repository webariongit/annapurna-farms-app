import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProductPageRoutingModule } from './all-product-routing.module';

import { AllProductPage } from './all-product.page';
import { FooterPage } from '../footer/footer.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProductPageRoutingModule,FooterPageModule
  ],
  declarations: [AllProductPage], exports:[FooterPage,AllProductPage]

})
export class AllProductPageModule {}
