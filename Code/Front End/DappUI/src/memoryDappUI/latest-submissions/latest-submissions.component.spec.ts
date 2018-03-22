import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestSubmissionsComponent } from './latest-submissions.component';

describe('LatestSubmissionsComponent', () => {
  let component: LatestSubmissionsComponent;
  let fixture: ComponentFixture<LatestSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
