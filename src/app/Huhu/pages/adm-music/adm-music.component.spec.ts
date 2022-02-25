import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMusicComponent } from './adm-music.component';

describe('AdmMusicComponent', () => {
  let component: AdmMusicComponent;
  let fixture: ComponentFixture<AdmMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
