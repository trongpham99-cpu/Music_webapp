import { User } from "src/app/models/user.model";

export interface UserListingState {
  users: Array<User>,
  isFetching: boolean,
  error: string,
  isSuccess: boolean
}
