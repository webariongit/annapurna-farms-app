import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpKpiPage } from './emp-kpi.page';

const routes: Routes = [
  {
    path: '',
    component: EmpKpiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpKpiPageRoutingModule {}
