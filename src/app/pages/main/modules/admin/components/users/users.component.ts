import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserListingState } from 'src/states/user.state';
import * as userAction from '../../../../../../../actions/user.action'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private store: Store<{ userListing: UserListingState }>
  ) {
    this.userListing$ = this.store.select(state=> state.userListing);
  }

  public userListing$: Observable<UserListingState>;
  public isFetching = false;

  ngOnInit(): void {
    this.store.dispatch(userAction.fetchUserListing());
    this.userListing$.subscribe(
      res=>{
        console.log(res)
        if(res.isSuccess){
          this.users = res.users;
          this.isFetching = true;
          return;
        }
        this.isFetching = false;
      }
    )

  }

  public users: Array<User> = [

  ];

}
