import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasTrainingComponent } from './pas-training.component';

describe('PasTrainingComponent', () => {
  let component: PasTrainingComponent;
  let fixture: ComponentFixture<PasTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
