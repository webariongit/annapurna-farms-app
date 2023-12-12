import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpDashboardPage } from './emp-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: EmpDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpDashboardPageRoutingModule {}
