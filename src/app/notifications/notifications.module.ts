import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { FooterPage } from '../footer/footer.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,FooterPageModule
  ],
  declarations: [NotificationsPage],exports:[FooterPage]
})
export class NotificationsPageModule {}
