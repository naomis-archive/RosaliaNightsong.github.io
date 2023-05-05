import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { gamesFiles } from 'src/assets/fileList';
import { adventures } from 'src/data/adventures';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected properties', () => {
    expect(component.games).toBeDefined();
    expect(component.games).toEqual(adventures);
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

  for (const adventure of adventures) {
    it(`should render the ${adventure.fileName} adventure`, () => {
      component.selectGame(String(adventures.indexOf(adventure)));
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
      expect(img?.getAttribute('alt')).toBe(adventure.game);
      const title = game?.querySelector('p');
      expect(title?.textContent?.trim()).toBe(adventure.game);
    });
  }

  it(`should have data for all games`, () => {
    expect(adventures.length).toBe(gamesFiles.length);
  });

  for (const data of adventures) {
    it(`${data.fileName} should exist in the CDN`, () => {
      expect(gamesFiles).toContain(data.fileName);
    });
  }

  for (const file of gamesFiles) {
    it(`should display the ${file} adventure`, () => {
      const adventure = adventures.find((el) => el.fileName === file);
      expect(adventure).toBeDefined();
    });
  }
});
