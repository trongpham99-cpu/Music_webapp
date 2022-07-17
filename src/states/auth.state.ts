import { User } from "src/app/models/user.model";

export interface AuthState {
  isLogin: boolean,
  error: string,
  token: string
}

export interface registerForm {
  email: string,
  password: string,
  displayName: string
}

export interface Register {
  registerForm: registerForm,
  isSuccess: boolean,
  error: string,
}
