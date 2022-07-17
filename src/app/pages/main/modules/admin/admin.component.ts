import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  items!: MegaMenuItem[];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Bài hát',
        icon: 'pi pi-fw pi-video',
        routerLink: "/admin/audios"
      },
      {
        label: 'Người dùng',
        icon: 'pi pi-fw pi-users',
        routerLink: "/admin/users"
      },
      {
        label: 'Nghệ Sĩ',
        icon: 'pi pi-fw pi-calendar',

      },
      {
        label: 'Danh mục',
        icon: 'pi pi-fw pi-cog',

      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
      },
    ];
  }

  click(event: any){}
}
