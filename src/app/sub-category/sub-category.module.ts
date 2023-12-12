import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoryPageRoutingModule } from './sub-category-routing.module';

import { SubCategoryPage } from './sub-category.page';
import { FooterPageModule } from '../footer/footer.module';
import { FooterPage } from '../footer/footer.page';
import { AllProductPage } from '../all-product/all-product.page';
import { AllProductPageModule } from '../all-product/all-product.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCategoryPageRoutingModule,FooterPageModule,AllProductPageModule,
  ],
  declarations: [SubCategoryPage],exports:[FooterPage,AllProductPage],schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
  
})
export class SubCategoryPageModule {}
