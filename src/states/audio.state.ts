import { Audio } from "src/app/models/audio.model";
export interface AudioListing {
    audios: Array<Audio>,
    isSuccess: boolean,
    isFetching: boolean,
    error: string,
}

export interface AudioDetail {
    audio: Audio,
    isSuccess: boolean,
    isFetching: boolean,
    error: string
}