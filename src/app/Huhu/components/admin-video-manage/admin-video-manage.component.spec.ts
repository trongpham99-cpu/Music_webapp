import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoManageComponent } from './admin-video-manage.component';

describe('AdminVideoManageComponent', () => {
  let component: AdminVideoManageComponent;
  let fixture: ComponentFixture<AdminVideoManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVideoManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
