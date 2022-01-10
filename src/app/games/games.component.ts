import { Component, OnInit } from '@angular/core';
import { GameInt, GameList } from 'src/assets/data/gameList';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  public games: GameInt[] = [];

  constructor() { }

  ngOnInit(): void {
    this.games = GameList;
  }

}
