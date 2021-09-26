import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected text', () => {
    const header = compiled.querySelector('h1');
    const texts = compiled.querySelectorAll('p');
    expect(header.innerText.trim()).toBe('Becca Lyria');
    expect(texts[0].innerText.trim()).toBe(
      `Hello there! I'm Becca Lyria. It is very nice to meet you.`
    );
  });
});
