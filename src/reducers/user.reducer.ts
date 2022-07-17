import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserListingState } from 'src/states/user.state';
import * as userAction from '../actions/user.action';

export const userListingReducer = createReducer(
    <UserListingState>{},
    on(userAction.fetchUserListing, (state) => {
        return {
            ...state,
            users: [],
            error: "",
            isFetching: true,
            isSuccess: false
        }
    }),
    on(userAction.fetchUserSuccess, (state, { users }) => {
        return {
            ...state,
            users: users,
            error: "",
            isFetching: false,
            isSuccess: true
        }
    }),
    on(userAction.fetchUserFailure, (state, { error }) => {
        return {
            ...state,
            users: [],
            error: error,
            isFetching: false,
            isSuccess: false
        }
    }),
);
