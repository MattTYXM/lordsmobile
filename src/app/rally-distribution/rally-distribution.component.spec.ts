import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RallyDistributionComponent} from './rally-distribution.component';

describe('RallyDistributionComponent', () => {
  let component: RallyDistributionComponent;
  let fixture: ComponentFixture<RallyDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RallyDistributionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RallyDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
