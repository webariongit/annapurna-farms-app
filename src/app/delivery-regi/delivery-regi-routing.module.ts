import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryRegiPage } from './delivery-regi.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryRegiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRegiPageRoutingModule {}
