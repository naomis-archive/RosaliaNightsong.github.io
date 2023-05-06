import { Component } from '@angular/core';
import { Adventure } from 'src/interfaces/Adventure';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent {
  public games: Adventure[] = [];
  public currentGameIndex = 0;

  constructor(private assetService: AssetsService) {
    this.assetService.fetchAdventures().subscribe((adventures) => {
      this.games = adventures.sort((a, b) => a.game.localeCompare(b.game));
    });
  }

  nextGame() {
    this.currentGameIndex =
      this.currentGameIndex === this.games.length - 1
        ? 0
        : this.currentGameIndex + 1;
  }

  previousGame() {
    this.currentGameIndex =
      this.currentGameIndex === 0
        ? this.games.length - 1
        : this.currentGameIndex - 1;
  }

  selectGame(index: string) {
    this.currentGameIndex = parseInt(index);
  }
}
