import { Artist } from "./artist.model"
import { Type } from "./type.model"
export interface Audio {
    _id: string,
    audioName: string,
    artistId: Artist,
    authorCreated: string,
    path: string,
    photoURL: string,
    typeId: Type,
    liked: number,
    listened: number,
    status: string,
    createdAt: string,
    updatedAt: string
}