import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosaComponent } from './rosa.component';

describe('RosaComponent', () => {
  let component: RosaComponent;
  let fixture: ComponentFixture<RosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
