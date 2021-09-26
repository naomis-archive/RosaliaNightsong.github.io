import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

const links = [
  { text: 'Becca Lyria', url: '/' },
  { text: 'About Me!', url: '/bio' },
  { text: 'View Art', url: '/gallery' },
  { text: 'My Adventures', url: '/adventures' },
  { text: 'Emotes', url: '/emotes' },
];

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected navigation links', () => {
    const linkElements = Array.from(compiled.querySelectorAll('a')).slice(
      0,
      links.length
    );
    linkElements.forEach((el: any, i) => {
      expect(el.getAttribute('routerLink')).toBe(links[i].url);
      expect(el.innerText.trim()).toBe(links[i].text);
    });
  });
});
