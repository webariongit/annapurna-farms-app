import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseInterestsPageRoutingModule } from './choose-interests-routing.module';

import { ChooseInterestsPage } from './choose-interests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseInterestsPageRoutingModule
  ],
  declarations: [ChooseInterestsPage]
})
export class ChooseInterestsPageModule {}
