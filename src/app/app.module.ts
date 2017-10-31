import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';

// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimeService } from './time.service';
import { ButtonBar } from './ui/button-bar/button-bar.component';
import { ButtonbarService } from './ui/button-bar/buttonbar.service';
import { TakeWhileComponent } from 'app/samples/take-while/take-while.component';
import { CompAliveComponent } from 'app/samples/comp-alive/comp-alive.component';
import { CompIsThereComponent } from './samples/comp-is-there/comp-is-there.component';
import { CompAliveObsComponent } from './samples/comp-alive-obs/comp-alive-obs.component';
import { RxOperatorComponent } from './samples/rx-operator/rx-operator.component';
import { TakeUntilComponent } from './samples/take-until/take-until.component';
import { WhipwheehwComponent } from './samples/whipWheehw/whipwheehw.component';
import { AsyncComponent } from 'app/samples/async/async.component';
import {
    ButtonBarItemComponent,
    ButtonBarItemDirective
} from './ui/button-bar-item/button-bar-item.component';
import { LeakyComponent } from './samples/leaky-component/leaky.component';
import { MultiStreamComponent } from './samples/multi-stream/multi-stream.component';
import { SwPeopleComponent } from './samples/sw-people/sw-people.component';
import { SwPeopleService } from './samples/sw-people.service';
import { SwPeopleFindComponent } from './samples/sw-people-find/sw-people-find.component';
import { GiphyService } from 'app/samples/giphy.service';
import { WikipediaService } from './samples/wikipedia.service';
import { WikipediaComponent } from './samples/wikipedia/wikipedia.component';
import { WikipediaOldComponent } from './samples/wikipedia/wikipedia-old.component';
import { ArtistsComponent } from './rijks/artists/artists.component';
import { RakiService } from 'app/rijks/raki.service';
import { ArtDetailComponent } from './rijks/art-detail/art-detail.component';
import { SimplefilmsComponent } from './samples/simplefilms/simplefilms.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'app/samples/in-memory-data.service';
import { Simplefilms2Component } from './samples/simplefilms2/simplefilms2.component';
import { Simplefilms3Component } from './samples/simplefilms3/simplefilms3.component';
import { SwUrlService } from 'app/samples/sw-url.service';
import { MovieComponent } from 'app/samples/router/movie.component';
import { SamplesComponent } from 'app/samples.component';

const routes: Routes = [
    { path: '',      component: SamplesComponent },
    { path: 'movie', component: MovieComponent },
    { path: 'movie/:id', component: MovieComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        AsyncComponent,
        ButtonBar,
        ButtonBarItemComponent,
        ButtonBarItemDirective,
        CompIsThereComponent,
        CompAliveComponent,
        CompAliveObsComponent,
        LeakyComponent,
        RxOperatorComponent,
        TakeUntilComponent,
        TakeWhileComponent,
        WhipwheehwComponent,
        MovieComponent,
        SamplesComponent,
        MultiStreamComponent,
        SwPeopleComponent,
        SwPeopleFindComponent,
        WikipediaComponent, WikipediaOldComponent,
        ArtistsComponent,
        ArtDetailComponent,
        SimplefilmsComponent,
        Simplefilms2Component,
        Simplefilms3Component
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientJsonpModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            passThruUnknownUrl: true
        }),
        RouterModule.forRoot(routes)
    ],
    providers: [
        TimeService,
        ButtonbarService,
        SwPeopleService,
        SwUrlService,
        GiphyService,
        WikipediaService,
        RakiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
