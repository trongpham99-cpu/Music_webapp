import { Audio } from "./audio.model";

export interface User{
    _id: string,
    displayName: string,
    email: string,
    photoURL: string,
    role: string,
    library: Array<Audio>,
    likeSong: Array<Audio>
}
