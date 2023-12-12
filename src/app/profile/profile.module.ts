import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { FooterPageModule } from '../footer/footer.module';
import { FooterPage } from '../footer/footer.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    HttpClientModule,
    ProfilePageRoutingModule,FooterPageModule
  ],
  declarations: [ProfilePage],exports:[FooterPage]
})
export class ProfilePageModule {}
