import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EMPTY, of } from 'rxjs';
import * as authAction from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.authLogin),
      switchMap((action) =>
        this.AuthService.userLogin(action.email, action.password).pipe(
          map((response: any) => {
            console.log(`response:::::${response}`);
            return authAction.authLoginSuccess({
              token: <string>response.accessToken,
            });
          })
        )
      ),
      catchError((err) => {
        console.log(err);
        return of(authAction.authLoginFailure({ error: err.error.message }));
      })
    )
  );

  authRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.register),
      switchMap((action) =>
        this.AuthService.userRegister(action.registerForm).pipe(
          map((response: any) => {
            console.log(response);
            return authAction.registerSuccess();
          })
        )
      ),
      catchError((err) => {
        console.log(err);
        return of(authAction.registerFailure({ error: err.error.message }));
      })
    )
  );

  constructor(private actions$: Actions, private AuthService: AuthService) { }
}
