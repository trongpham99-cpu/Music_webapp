import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMusicManageComponent } from './admin-music-manage.component';

describe('AdminMusicManageComponent', () => {
  let component: AdminMusicManageComponent;
  let fixture: ComponentFixture<AdminMusicManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMusicManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMusicManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
