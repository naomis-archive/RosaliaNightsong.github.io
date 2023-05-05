import { Component, OnInit } from '@angular/core';
import { bioData, BioInt } from 'src/data/bio';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: [],
})
export class BioComponent implements OnInit {
  details: BioInt[] = [];
  constructor() {}

  ngOnInit(): void {
    this.details = bioData;
  }
}
