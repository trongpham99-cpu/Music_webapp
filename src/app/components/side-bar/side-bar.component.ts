import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [MessageService]
})
export class SideBarComponent implements OnInit {

  constructor(public authSV: AuthService,
    private messageService: MessageService) { }

  displayBasic!: boolean;

  ngOnInit(): void {

  }

  showBasicDialog() {
    // this.displayBasic = true;
    this.messageService.add({severity:'error', summary:'Error', detail:'Chức năng đang phát triển'});
  }

}
