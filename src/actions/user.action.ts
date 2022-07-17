import { createAction, props } from '@ngrx/store';
import { User } from '../app/models/user.model'
export const fetchUserListing = createAction('[User Component] fetchUser');
export const fetchUserSuccess = createAction('[User Component] fetchUserSuccess', props<{ users: Array<User> }>());
export const fetchUserFailure = createAction('[User Component] fetchUserFailure', props<{ error: string }>());
