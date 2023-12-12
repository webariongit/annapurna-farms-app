import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryRegiPageRoutingModule } from './delivery-regi-routing.module';

import { DeliveryRegiPage } from './delivery-regi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryRegiPageRoutingModule
  ],
  declarations: [DeliveryRegiPage]
})
export class DeliveryRegiPageModule {}
