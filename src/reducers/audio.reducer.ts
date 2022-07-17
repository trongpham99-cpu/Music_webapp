import { createReducer, on } from '@ngrx/store';
import { Audio } from 'src/app/models/audio.model';
import { AudioDetail, AudioListing } from 'src/states/audio.state';
import * as audioAction from '../actions/audio.action';

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

export const audioDetailReducer = createReducer(
    <AudioDetail>{},
    on(audioAction.audioDetail, (state) => {
        return {
            ...state,
            audio: <Audio>{},
            error: "",
            isFetching: false,
            isSuccess: false
        }
    }),
    on(audioAction.fetchAudioDetail, (state, { id }) => {
        return {
            ...state,
            audio: <Audio>{},
            error: "",
            isFetching: true,
            isSuccess: false
        }
    }),
    on(audioAction.fetchAudioDetailSuccess, (state, { audio }) => {
        return {
            ...state,
            audio: <Audio>audio,
            error: "",
            isFetching: false,
            isSuccess: true
        }
    }),
    on(audioAction.fetchAudioDetailFailure, (state, { error }) => {
        return {
            ...state,
            audio: <Audio>{},
            error: error,
            isFetching: false,
            isSuccess: false
        }
    })
)
