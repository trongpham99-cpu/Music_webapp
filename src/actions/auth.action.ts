import { createAction, props } from '@ngrx/store';
import { registerForm, Register } from '../states/auth.state'

export const authLogin = createAction('[Login Component] authLogin', props< { email: string, password: string } >());
export const authLoginSuccess = createAction('[Login Component] authLoginSuccess', props<{ token: string }>());
export const authLoginFailure = createAction('[Login Component] authLoginFailure', props<{ error: string }>());

export const register = createAction('[User Component] register', props<{ registerForm: registerForm }>());
export const registerSuccess = createAction('[User Component] registerSuccess');
export const registerFailuare = createAction('[User Component] registerFailuare', props<{ error: string }>())
