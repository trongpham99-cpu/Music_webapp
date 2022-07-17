import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [MessageService]
})
export class SideBarComponent implements OnInit {

  constructor(public authSV: AuthService,
    private messageService: MessageService) {
  }

  displayBasic!: boolean;
  user!: User;
  isAdmin = false;
  ngOnInit(): void {
    this.authSV.getProfile()?.subscribe((res) => {
      console.log(res)
      if (res) {
        this.user = <User>res;
      }
      if (this.user.role === 'admin') {
        this.isAdmin = true;
      }

    });
  }

  showBasicDialog() {
    // this.displayBasic = true;
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Chức năng đang phát triển' });
  }

}
