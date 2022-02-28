import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmVideoComponent } from './adm-video.component';

describe('AdmVideoComponent', () => {
  let component: AdmVideoComponent;
  let fixture: ComponentFixture<AdmVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
