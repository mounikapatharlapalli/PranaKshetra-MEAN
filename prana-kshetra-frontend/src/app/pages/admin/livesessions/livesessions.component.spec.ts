import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesessionsComponent } from './livesessions.component';

describe('LivesessionsComponent', () => {
  let component: LivesessionsComponent;
  let fixture: ComponentFixture<LivesessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivesessionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivesessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
