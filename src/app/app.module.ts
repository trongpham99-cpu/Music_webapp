import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { audioListingReducer, audioDetailReducer } from 'src/reducers/audio.reducer';
import { AudioEffects } from 'src/effects/audio.effect';
import { userListingReducer } from 'src/reducers/user.reducer';
import { UserEffects } from 'src/effects/user.effect';
import { authLoginReducer, registerReducer } from 'src/reducers/auth.reducer';
import { AuthEffects } from 'src/effects/auth.effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({
      listingAudio: audioListingReducer,
      audioDetail: audioDetailReducer,
      userListing: userListingReducer,
      authLogin: authLoginReducer,
      register: registerReducer
    }, {}),
    EffectsModule.forRoot([
      AudioEffects,
      UserEffects,
      AuthEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
