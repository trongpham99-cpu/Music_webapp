import { Artist } from "./artist.model"
import { Type } from "./type.model"
import { User } from "./user.model"
export interface Audio {
    _id: string,
    audioName: string,
    artistId: Artist,
    authorCreated: User,
    path: string,
    photoURL: string,
    typeId: Type,
    liked: number,
    listened: number,
    status: string,
    createdAt?: string,
    updatedAt?: string
}
