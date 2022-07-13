import { createAction, props } from '@ngrx/store';
import { Audio } from '../app/models/audio.model'

export const fetchAudio = createAction('[Audio Component] fetchAudio');
export const fetchAudioSuccess = createAction('[Audio Component] fetchAudioSuccess', props<{ audios: Array<Audio> }>());
export const fetchAudioFailure = createAction('[Audio Component] fetchAudioFailure', props<{ error: string }>());