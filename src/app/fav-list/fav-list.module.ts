import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavListPageRoutingModule } from './fav-list-routing.module';

import { FavListPage } from './fav-list.page';
import { FooterPage } from '../footer/footer.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavListPageRoutingModule,FooterPageModule
  ],
  declarations: [FavListPage], exports:[FooterPage]
})
export class FavListPageModule {}
