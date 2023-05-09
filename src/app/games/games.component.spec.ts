import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { HttpClientModule } from '@angular/common/http';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    component.games = [
      {
        fileName: 'divinity-original-sin-ii.jpg',
        game: 'Divinity: Original Sin II',
        alt: 'Rosalia in a white robe, leaning on a flaming greatsword.',
        description: 'Becoming the Godwoken was her true calling.',
      },
      {
        fileName: 'dragon-age-ii.jpg',
        game: 'Dragon Age II',
        alt: 'Portrait of Rosalia, her hair down with french braids on the sides.',
        description:
          "Rosalia doesn't remember much about this adventure, but it was fun.",
      },
    ];
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected properties', () => {
    expect(component.games).toBeDefined();
  });

  it('should render the games view', () => {
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    const title = compiled.querySelector('h1');
    expect(title?.textContent?.trim()).toBe('Adventures');
    const buttons = compiled.querySelectorAll('.nes-btn');
    expect(buttons.length).toBe(3);
    expect(buttons[0].tagName).toBe('BUTTON');
    expect(buttons[0].textContent?.trim()).toBe('Previous Adventure');
    expect(buttons[1].tagName).toBe('BUTTON');
    expect(buttons[1].textContent?.trim()).toBe('Next Adventure');
    expect(buttons[2].tagName).toBe('A');
    expect(buttons[2].textContent?.trim()).toBe("That's enough for today");
    expect(buttons[2].getAttribute('routerLink')).toBe('/rosa');
  });

  it(`should render the adventures correctly`, () => {
    for (const adventure of component.games) {
      component.selectGame(String(component.games.indexOf(adventure)));
      fixture.detectChanges();
      compiled = fixture.nativeElement;
      const game = compiled.querySelector('.game');
      const imgLink = game?.querySelector('a');
      expect(imgLink?.getAttribute('href')).toBe(
        `https://cdn.naomi.lgbt/rosalia/games/${adventure.fileName}`
      );
      expect(imgLink?.getAttribute('target')).toBe('_blank');
      const img = game?.querySelector('img');
      expect(img?.getAttribute('src')).toBe(
        `https://cdn.naomi.lgbt/rosalia/games/${adventure.fileName}`
      );
      expect(img?.getAttribute('alt')).toBe(adventure.alt);
      const title = game?.querySelector('h2');
      expect(title?.textContent?.trim()).toBe(adventure.game);
      const description = game?.querySelector('p');
      expect(description?.textContent?.trim()).toBe(adventure.description);
    }
  });
});
