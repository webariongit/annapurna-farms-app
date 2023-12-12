import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpDashboardPage } from './emp-dashboard.page';

describe('EmpDashboardPage', () => {
  let component: EmpDashboardPage;
  let fixture: ComponentFixture<EmpDashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
