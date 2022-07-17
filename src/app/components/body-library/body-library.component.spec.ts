import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLibraryComponent } from './body-library.component';

describe('BodyLibraryComponent', () => {
  let component: BodyLibraryComponent;
  let fixture: ComponentFixture<BodyLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
