import { createAction, props } from '@ngrx/store';
import { Audio } from '../app/models/audio.model'

export const fetchAudio = createAction('[Audio Component] fetchAudio');
export const fetchAudioSuccess = createAction('[Audio Component] fetchAudioSuccess', props<{ audios: Array<Audio> }>());
export const fetchAudioFailure = createAction('[Audio Component] fetchAudioFailure', props<{ error: string }>());

export const audioDetail = createAction('[Audio Component] AudioDetail');
export const fetchAudioDetail = createAction('[Audio Component] fetchAudioDetail', props<{ id: string }>());
export const fetchAudioDetailSuccess = createAction('[Audio Component] fetchAudioDetailSuccess', props<{ audio: Audio }>());
export const fetchAudioDetailFailure = createAction('[Audio Component] fetchAudioDetailFailure', props<{ error: string }>());