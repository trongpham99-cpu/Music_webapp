import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import * as userAction from '../actions/user.action';
import { EMPTY, of } from 'rxjs';


@Injectable()
export class UserEffects {

    listingUser$ = createEffect(() => this.actions$.pipe(
        ofType(userAction.fetchUserListing),
        switchMap(() => this.AuthService.getUsers()
            .pipe(
                map(users => {
                  // console.log(users);
                  return userAction.fetchUserSuccess( { users: <Array<User>>users } )
                }))
        ),
        catchError(err=> {
          // console.log(err);
          return of(userAction.fetchUserFailure( { error: err.message } ))
        })
    ));

    constructor(
        private actions$: Actions,
        private AuthService: AuthService
    ) { }
}
