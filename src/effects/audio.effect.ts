import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Audio } from 'src/app/models/audio.model';
import { AudioService } from 'src/app/services/audio.service';
import * as audioAction from '../actions/audio.action';

@Injectable()
export class AudioEffects {

    listingAudio$ = createEffect(() => this.actions$.pipe(
        ofType(audioAction.fetchAudio),
        mergeMap(() => this.AudioService.getAudios()
            .pipe(
                map(audios => (audioAction.fetchAudioSuccess({ audios: <Array<Audio>>audios })),
                    catchError((error) => of(audioAction.fetchAudioFailure({ error: error.message })))
                ))
        )
    ));

    detailAudio$ = createEffect(() => this.actions$.pipe(
        ofType(audioAction.fetchAudioDetail),
        switchMap((action) => this.AudioService.getDetail(action.id).pipe(
            map(audio => (audioAction.fetchAudioDetailSuccess({ audio: <Audio>audio })),
                catchError((error) => of(audioAction.fetchAudioDetailFailure({ error: error.message })))
            )))

    ))

    constructor(
        private actions$: Actions,
        private AudioService: AudioService
    ) { }
}