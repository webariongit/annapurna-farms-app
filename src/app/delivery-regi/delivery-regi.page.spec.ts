import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryRegiPage } from './delivery-regi.page';

describe('DeliveryRegiPage', () => {
  let component: DeliveryRegiPage;
  let fixture: ComponentFixture<DeliveryRegiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeliveryRegiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
