import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthState, Register, registerForm } from 'src/states/auth.state';
import * as authAction from '../actions/auth.action';

export const authLoginReducer = createReducer(
    <AuthState>{},
    on(authAction.authLogin, (state, { email, password }) => {
        return {
            ...state,
            error: "",
            isLogin: false,
            token: ""
        }
    }),
    on(authAction.authLoginSuccess,(state, { token }) => {
        return {
            ...state,
            error: "",
            isLogin: true,
            token: token
        }
    }),
    on(authAction.authLoginFailure, (state, { error }) => {
        return {
            ...state,
            error: error,
            isLogin: false,
            token: ""
        }
    }),
);

export const registerReducer = createReducer(
  <Register>{},
  on(authAction.register, ( state, { registerForm } )=>{
    return {
      ...state,
      error: "",
      isSuccess: false,
      registerForm: <registerForm>{},
    }
  }),
  on(authAction.registerSuccess, (state)=>{
    return {
      ...state,
      error: "",
      isSuccess: true,
      registerForm: <registerForm>{}
    }
  }),
  on(authAction.registerFailuare, (state, { error })=>{
    return {
      ...state,
      error: error,
      isSuccess: false,
      registerForm: <registerForm>{}
    }
  }),
)
