import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpDashboardPageRoutingModule } from './emp-dashboard-routing.module';

import { EmpDashboardPage } from './emp-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpDashboardPageRoutingModule
  ],
  declarations: [EmpDashboardPage]
})
export class EmpDashboardPageModule {}
