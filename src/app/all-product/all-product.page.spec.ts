import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllProductPage } from './all-product.page';

describe('AllProductPage', () => {
  let component: AllProductPage;
  let fixture: ComponentFixture<AllProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
