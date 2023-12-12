import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseInterestsPage } from './choose-interests.page';

describe('ChooseInterestsPage', () => {
  let component: ChooseInterestsPage;
  let fixture: ComponentFixture<ChooseInterestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChooseInterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
