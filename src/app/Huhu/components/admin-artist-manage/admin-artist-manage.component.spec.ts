import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistManageComponent } from './admin-artist-manage.component';

describe('AdminArtistManageComponent', () => {
  let component: AdminArtistManageComponent;
  let fixture: ComponentFixture<AdminArtistManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArtistManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
