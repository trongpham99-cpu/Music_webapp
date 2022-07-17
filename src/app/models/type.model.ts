import { Audio } from "./audio.model";

export interface Type{
    _id: string,
    name_type: string,
    album: string,
    description: string,
    dateAdd: string,
    photo: string,
    audios:Array<Audio>,
}