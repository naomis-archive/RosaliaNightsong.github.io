import { Component, OnInit } from '@angular/core';
import { Portrait } from 'src/interfaces/Portrait';
import { AssetsService } from '../assets.service';

type viewType = 'intro' | 'portrait' | 'pose';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  public view: viewType = 'intro';
  public portraits: Portrait[] = [];
  public poses: string[] = [];
  public currentPortraitIndex = 0;
  public currentEmoteIndex = 0;
  public currentPoseIndex = 0;

  constructor(private assetService: AssetsService) {
    this.assetService.fetchPortraits().subscribe((portraits) => {
      this.portraits = portraits.sort((a, b) => a.name.localeCompare(b.name));
    });
    this.assetService.fetchPoses().subscribe((poses) => {
      this.poses = poses.sort((a, b) => a.localeCompare(b));
    });
  }

  changeView(name: viewType) {
    this.view = name;
    window.scrollTo({ top: 0 });
  }

  nextPortrait() {
    this.currentPortraitIndex =
      this.currentPortraitIndex === this.portraits.length - 1
        ? 0
        : this.currentPortraitIndex + 1;
  }

  previousPortrait() {
    this.currentPortraitIndex =
      this.currentPortraitIndex === 0
        ? this.portraits.length - 1
        : this.currentPortraitIndex - 1;
  }

  selectPortrait(index: string) {
    this.currentPortraitIndex = parseInt(index);
  }

  nextPose() {
    this.currentPoseIndex =
      this.currentPoseIndex === this.poses.length - 1
        ? 0
        : this.currentPoseIndex + 1;
  }

  previousPose() {
    this.currentPoseIndex =
      this.currentPoseIndex === 0
        ? this.poses.length - 1
        : this.currentPoseIndex - 1;
  }

  selectPose(index: string) {
    this.currentPoseIndex = parseInt(index);
  }

  getPoseName(index: number) {
    const fileName = this.poses[index];
    const withoutExtension = fileName.split('.')[0];
    const [name, number] = withoutExtension.split('-');
    const titleCasedName = `${name[0].toUpperCase()}${name.slice(1)}`;
    return number ? `${titleCasedName} ${number}` : titleCasedName;
  }
}
