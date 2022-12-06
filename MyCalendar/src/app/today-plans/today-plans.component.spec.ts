import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayPlansComponent } from './today-plans.component';

describe('TodayPlansComponent', () => {
  let component: TodayPlansComponent;
  let fixture: ComponentFixture<TodayPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
