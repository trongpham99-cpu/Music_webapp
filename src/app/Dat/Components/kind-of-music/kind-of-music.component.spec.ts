import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfMusicComponent } from './kind-of-music.component';

describe('KindOfMusicComponent', () => {
  let component: KindOfMusicComponent;
  let fixture: ComponentFixture<KindOfMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindOfMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindOfMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
