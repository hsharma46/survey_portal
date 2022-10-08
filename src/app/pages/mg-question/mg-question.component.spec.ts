import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgQuestionComponent } from './mg-question.component';

describe('MgQuestionComponent', () => {
  let component: MgQuestionComponent;
  let fixture: ComponentFixture<MgQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MgQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
