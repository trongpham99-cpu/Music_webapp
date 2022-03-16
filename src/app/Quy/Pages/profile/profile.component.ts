import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user!: User
  constructor( public authSV: AuthService) { }
  ngOnInit(): void {
    this.authSV.getProfile()?.subscribe((res: any) => {
      this.user = res;
    })
  }

}
