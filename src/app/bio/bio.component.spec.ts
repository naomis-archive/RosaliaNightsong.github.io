import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bioData } from 'src/assets/data/bio';

import { BioComponent } from './bio.component';

describe('BioComponent', () => {
  let component: BioComponent;
  let fixture: ComponentFixture<BioComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BioComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the bio data correctly', () => {
    expect(component.details).toEqual(bioData);
  });

  it('should render the header correctly', () => {
    const header = compiled.querySelector('h1');
    expect(header.innerText.trim()).toBe('About Me');
  });

  it('should render the bio data correctly', () => {
    const headers = compiled.querySelectorAll('h2');
    const texts = compiled.querySelectorAll('p');
    bioData.forEach((el, i) => {
      expect(headers[i].innerText.trim()).toBe(el.category);
      expect(texts[i].innerText.trim()).toBe(el.data);
    });
  });
});
