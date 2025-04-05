import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrainerComponent } from './add-edit-trainer.component';

describe('AddEditTrainerComponent', () => {
  let component: AddEditTrainerComponent;
  let fixture: ComponentFixture<AddEditTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTrainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
