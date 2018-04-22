import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { OnoffbuttonModule } from 'onoffbutton';
import { SeNeonModule } from 'se-neon';

import { AppComponent } from './app.component';
import { ArtDetailComponent } from './rijks/art-detail/art-detail.component';
import { ArtistsComponent } from './rijks/artists/artists.component';
import { RakiService } from './rijks/raki.service';
import { SamplesComponent } from './samples.component';
import { AsyncPipeComponent } from './samples/async-pipe/async-pipe.component';
import { CompAliveObsComponent } from './samples/comp-alive-obs/comp-alive-obs.component';
import { CompAliveComponent } from './samples/comp-alive/comp-alive.component';
import { CompIsThereComponent } from './samples/comp-is-there/comp-is-there.component';
import { ErrorIsolationComponent } from './samples/error-isolation/error-isolation.component';
import { FilmPeopleComponent } from './samples/film-people/film-people.component';
import { GiphyService } from './samples/giphy.service';
import { InMemoryDataService } from './samples/in-memory-data.service';
import { LeakyComponent } from './samples/leaky-component/leaky.component';
import { MultiStreamComponent } from './samples/multi-stream/multi-stream.component';
import { RawComponent } from './samples/raw/raw.component';
import { MovieComponent } from './samples/router/movie.component';
import { RxOperatorComponent } from './samples/rx-operator/rx-operator.component';
import { SimplefilmsComponent } from './samples/simplefilms/simplefilms.component';
import { Simplefilms2Component } from './samples/simplefilms2/simplefilms2.component';
import { Simplefilms3Component } from './samples/simplefilms3/simplefilms3.component';
import { Simplefilms4Component } from './samples/simplefilms4/simplefilms4.component';
import { SwPeopleFindComponent } from './samples/sw-people-find/sw-people-find.component';
import { SwPeopleService } from './samples/sw-people-expand.service';
import { SwPeopleComponent } from './samples/sw-people/sw-people.component';
import { SwUrlService } from './samples/sw-url.service';
import { TakeUntilComponent } from './samples/take-until/take-until.component';
import { TakeWhileComponent } from './samples/take-while/take-while.component';
import { WhipwheehwComponent } from './samples/whipWheehw/whipwheehw.component';
import { WikipediaService } from './samples/wikipedia.service';
import { WikipediaComponent } from './samples/wikipedia/wikipedia.component';

import { TimeService } from './time.service';
import { ButtonBarItemComponent, ButtonBarItemDirective } from './ui/button-bar-item/button-bar-item.component';
import { ButtonBar } from './ui/button-bar/button-bar.component';
import { ButtonbarService } from './ui/button-bar/buttonbar.service';

const routes: Routes = [
  { path: '', component: SamplesComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'movie/:id', component: MovieComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArtDetailComponent,
    ArtistsComponent,
    AsyncPipeComponent,
    ButtonBar,
    ButtonBarItemComponent,
    ButtonBarItemDirective,
    CompAliveComponent,
    CompAliveObsComponent,
    CompIsThereComponent,
    ErrorIsolationComponent,
    FilmPeopleComponent,
    LeakyComponent,
    MovieComponent,
    MultiStreamComponent,
    RawComponent,
    RxOperatorComponent,
    SamplesComponent,
    Simplefilms2Component,
    Simplefilms3Component,
    Simplefilms4Component,
    SimplefilmsComponent,
    SwPeopleComponent,
    SwPeopleFindComponent,
    TakeUntilComponent,
    TakeWhileComponent,
    WhipwheehwComponent,
    WikipediaComponent,
  ],
  imports: [
    BrowserModule,
    OnoffbuttonModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true
    }),
    RouterModule.forRoot(routes),
    SeNeonModule
  ],
  providers: [
    ButtonbarService,
    GiphyService,
    RakiService,
    SwPeopleService,
    SwUrlService,
    TimeService,
    WikipediaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
