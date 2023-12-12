import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpKpiPage } from './emp-kpi.page';

describe('EmpKpiPage', () => {
  let component: EmpKpiPage;
  let fixture: ComponentFixture<EmpKpiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpKpiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
