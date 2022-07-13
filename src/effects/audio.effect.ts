import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { AudioService } from 'src/app/services/audio.service';
import * as audioAction from '../actions/audio.action';

@Injectable()
export class AudioEffects {

    listingAudio$ = createEffect(() => this.actions$.pipe(
        ofType(audioAction.fetchAudio),
        mergeMap(() => this.AudioService.getAudios()
            .pipe(
                map((audios: any) => (audioAction.fetchAudioSuccess({ audios: audios })),
                    catchError((error) => of(audioAction.fetchAudioFailure({ error: error.message })))
                ))
        )
    ));

    constructor(
        private actions$: Actions,
        private AudioService: AudioService
    ) { }
}