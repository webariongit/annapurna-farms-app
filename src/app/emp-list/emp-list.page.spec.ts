import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpListPage } from './emp-list.page';

describe('EmpListPage', () => {
  let component: EmpListPage;
  let fixture: ComponentFixture<EmpListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
