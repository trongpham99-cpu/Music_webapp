import { Artist } from "./artist.model"
export interface Audio{
    _id: string,
    songName: string,
    authorId: Artist,
    dateSubmit: string,
    authorCreate: string,
    path: string,
    sugesstion: string,
    photoURL: string,
    category: string,
    album: string,
    submmitted: number,
    liked: number,
    listened: number
}