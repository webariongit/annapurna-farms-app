import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpKpiPageRoutingModule } from './emp-kpi-routing.module';

import { EmpKpiPage } from './emp-kpi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpKpiPageRoutingModule
  ],
  declarations: [EmpKpiPage]
})
export class EmpKpiPageModule {}
