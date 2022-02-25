import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotMusicComponent } from './hot-music.component';

describe('HotMusicComponent', () => {
  let component: HotMusicComponent;
  let fixture: ComponentFixture<HotMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
