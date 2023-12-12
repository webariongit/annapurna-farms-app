import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BagPageRoutingModule } from './bag-routing.module';

import { BagPage } from './bag.page';
import { FooterPageModule } from '../footer/footer.module';
import { FooterPage } from '../footer/footer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BagPageRoutingModule,FooterPageModule
  ],
  declarations: [BagPage], exports:[FooterPage]
})
export class BagPageModule {}
