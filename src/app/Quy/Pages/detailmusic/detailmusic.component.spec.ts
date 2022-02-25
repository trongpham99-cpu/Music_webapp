import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmusicComponent } from './detailmusic.component';

describe('DetailmusicComponent', () => {
  let component: DetailmusicComponent;
  let fixture: ComponentFixture<DetailmusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailmusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
