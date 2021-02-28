import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingTabComponent } from './pricing-tab.component';

describe('PricingTabComponent', () => {
  let component: PricingTabComponent;
  let fixture: ComponentFixture<PricingTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
