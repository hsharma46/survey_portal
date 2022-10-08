import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMgQuestionComponent } from './add-mg-question.component';

describe('AddMgQuestionComponent', () => {
  let component: AddMgQuestionComponent;
  let fixture: ComponentFixture<AddMgQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMgQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMgQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
