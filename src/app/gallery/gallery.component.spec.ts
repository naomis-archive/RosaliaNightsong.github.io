import { ComponentFixture, TestBed } from '@angular/core/testing';
import { portraits } from 'src/data/portraits';

import { GalleryComponent } from './gallery.component';
import { poses } from 'src/data/poses';
import { artFiles, posesFiles } from 'src/assets/fileList';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the intro view', () => {
    expect(component.view).toBe('intro');
    const title = compiled.querySelector('h1');
    expect(title?.textContent?.trim()).toBe('Gallery');
    const buttons = compiled.querySelectorAll('.nes-btn');
    expect(buttons.length).toBe(3);
    expect(buttons[0].tagName).toBe('BUTTON');
    expect(buttons[0].textContent?.trim()).toBe('Portrait Exhibit');
    expect(buttons[1].tagName).toBe('BUTTON');
    expect(buttons[1].textContent?.trim()).toBe('Mural Exhibit');
    expect(buttons[2].tagName).toBe('A');
    expect(buttons[2].textContent?.trim()).toBe('Enough art for now');
    expect(buttons[2].getAttribute('routerLink')).toBe('/rosa');
  });

  it('should render the portrait view', () => {
    component.changeView('portrait');
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(component.view).toBe('portrait');
    const title = compiled.querySelector('h1');
    expect(title?.textContent?.trim()).toBe('Portraits');
    const buttons = compiled.querySelectorAll('.nes-btn');
    expect(buttons.length).toBe(4);
    expect(buttons[0].tagName).toBe('BUTTON');
    expect(buttons[0].textContent?.trim()).toBe('Previous Portrait');
    expect(buttons[1].tagName).toBe('BUTTON');
    expect(buttons[1].textContent?.trim()).toBe('Next Portrait');
    expect(buttons[2].tagName).toBe('BUTTON');
    expect(buttons[2].textContent?.trim()).toBe('Mural Exhibit');
    expect(buttons[3].tagName).toBe('A');
    expect(buttons[3].textContent?.trim()).toBe('Enough art for now');
    expect(buttons[3].getAttribute('routerLink')).toBe('/rosa');
  });

  for (const portrait of portraits) {
    it(`should render the ${portrait.fileName} art`, () => {
      component.changeView('portrait');
      component.selectPortrait(String(portraits.indexOf(portrait)));
      fixture.detectChanges();
      compiled = fixture.nativeElement;
      expect(component.view).toBe('portrait');
      const portraitBox = compiled.querySelector('.image');
      const links = portraitBox?.querySelectorAll('a');
      const imageLink = links?.[0];
      expect(imageLink?.getAttribute('href')).toBe(
        `https://cdn.naomi.lgbt/rosalia/art/${portrait.fileName}`
      );
      expect(imageLink?.getAttribute('target')).toBe('_blank');
      const artistLink = links?.[1];
      expect(artistLink?.getAttribute('href')).toBe(portrait.artistUrl);
      expect(artistLink?.getAttribute('target')).toBe('_blank');
      const img = portraitBox?.querySelector('img');
      expect(img?.getAttribute('src')).toBe(
        `https://cdn.naomi.lgbt/rosalia/art/${portrait.fileName}`
      );
      expect(img?.getAttribute('alt')).toBe('');
      const title = portraitBox?.querySelector('p');
      expect(title?.textContent?.trim()).toBe(`By ${portrait.artist}`);
    });
  }

  it(`should have data for all portraits`, () => {
    expect(portraits.length).toBe(artFiles.length);
  });

  for (const data of portraits) {
    it(`${data.fileName} should exist in the CDN`, () => {
      expect(artFiles).toContain(data.fileName);
    });
  }

  for (const file of artFiles) {
    it(`should display the ${file} portrait`, () => {
      const portrait = portraits.find((p) => p.fileName === file);
      expect(portrait).toBeDefined();
    });
  }

  it('should render the murals view', () => {
    component.changeView('pose');
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(component.view).toBe('pose');
    const title = compiled.querySelector('h1');
    expect(title?.textContent?.trim()).toBe('Poses');
    const buttons = compiled.querySelectorAll('.nes-btn');
    expect(buttons.length).toBe(4);
    expect(buttons[0].tagName).toBe('BUTTON');
    expect(buttons[0].textContent?.trim()).toBe('Previous Mural');
    expect(buttons[1].tagName).toBe('BUTTON');
    expect(buttons[1].textContent?.trim()).toBe('Next Mural');
    expect(buttons[2].tagName).toBe('BUTTON');
    expect(buttons[2].textContent?.trim()).toBe('Portrait Exhibit');
    expect(buttons[3].tagName).toBe('A');
    expect(buttons[3].textContent?.trim()).toBe('Enough art for now');
    expect(buttons[3].getAttribute('routerLink')).toBe('/rosa');
  });

  for (const pose of poses) {
    it(`should render the ${pose} pose`, () => {
      component.changeView('pose');
      component.selectPose(String(poses.indexOf(pose)));
      fixture.detectChanges();
      compiled = fixture.nativeElement;
      expect(component.view).toBe('pose');
      const emoteBox = compiled.querySelector('.image');
      const imageLink = emoteBox?.querySelector('a');
      expect(imageLink?.getAttribute('href')).toBe(
        `https://cdn.naomi.lgbt/rosalia/koikatsu/${pose}`
      );
      expect(imageLink?.getAttribute('target')).toBe('_blank');
      const img = emoteBox?.querySelector('img');
      expect(img?.getAttribute('src')).toBe(
        `https://cdn.naomi.lgbt/rosalia/koikatsu/${pose}`
      );
      expect(img?.getAttribute('alt')).toBe('Naomi');
      const title = emoteBox?.querySelector('p');
      expect(title?.textContent?.trim()).toBe(
        component.getPoseName(poses.indexOf(pose))
      );
    });
  }

  it(`should have data for all poses`, () => {
    expect(poses.length).toBe(posesFiles.length);
  });

  for (const data of poses) {
    it(`${data} should exist in the CDN`, () => {
      expect(posesFiles).toContain(data);
    });
  }

  for (const file of posesFiles) {
    it(`should display the ${file} pose`, () => {
      const pose = poses.find((p) => p === file);
      expect(pose).toBeDefined();
    });
  }
});
