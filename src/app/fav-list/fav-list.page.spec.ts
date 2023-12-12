import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavListPage } from './fav-list.page';

describe('FavListPage', () => {
  let component: FavListPage;
  let fixture: ComponentFixture<FavListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FavListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
