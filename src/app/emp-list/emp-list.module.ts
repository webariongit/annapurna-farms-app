import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpListPageRoutingModule } from './emp-list-routing.module';

import { EmpListPage } from './emp-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpListPageRoutingModule
  ],
  declarations: [EmpListPage]
})
export class EmpListPageModule {}
