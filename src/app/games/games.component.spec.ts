import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameList } from 'src/assets/data/gameList';

import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let compiled: any;

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
    expect(component.games).toEqual(GameList);
  });

  it('should render the opening texts correctly', () => {
    const title = compiled.querySelector('h1');
    const intro = compiled.querySelector('p');
    expect(title.innerText.trim()).toBe('My Adventures');
    expect(intro.innerText.trim()).toBe(
      `These images come from the various adventures I've undertaken.`
    );
  });

  it('should render the game data correctly', () => {
    const gameTiles = compiled.querySelectorAll('.grid-box');
    GameList.forEach((game, i) => {
      const imageLink = gameTiles[i].querySelector('img').getAttribute('src');
      const gameName = gameTiles[i]
        .querySelector('.game-name')
        .innerText.trim();
      const gameLink = gameTiles[i]
        .querySelector('.game-link')
        .getAttribute('href');
      expect(imageLink).toContain(game.fileName);
      expect(gameName).toBe(game.gameName);
      expect(gameLink).toBe(game.gameUrl);
    });
  });
});
