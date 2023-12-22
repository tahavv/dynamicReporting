import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChartsComponent } from './home-charts.component';

describe('HomeChartsComponent', () => {
  let component: HomeChartsComponent;
  let fixture: ComponentFixture<HomeChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
