import { Audio } from "./audio.model"
export interface Artist{
    artistName: string,
    dateOfBirth: string,
    placeOfBirth: string,
    describtion: string,
    followers: number,
    listeners: number,
    worldArtistRanked: number,
    songs:Array<Audio>
}