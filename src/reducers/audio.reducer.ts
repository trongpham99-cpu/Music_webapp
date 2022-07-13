import { createReducer, on } from '@ngrx/store';
import { AudioListing } from 'src/states/audio.state';
import * as audioAction from '../actions/audio.action';

export const initialState = 0;


export const audioListingReducer = createReducer(
    <AudioListing>{},
    on(audioAction.fetchAudio, (state) => {
        return {
            ...state,
            audios: [],
            error: "",
            isFetching: true,
            isSuccess: false
        }
    }),
    on(audioAction.fetchAudioSuccess, (state, { audios }) => {
        return {
            ...state,
            audios: audios,
            error: "",
            isFetching: false,
            isSuccess: true
        }
    }),
    on(audioAction.fetchAudioFailure, (state, { error }) => {
        return {
            ...state,
            audios: [],
            error: error,
            isFetching: false,
            isSuccess: false
        }
    }),
);