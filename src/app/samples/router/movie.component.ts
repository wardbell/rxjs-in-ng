import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Movie } from 'app/samples/sw-interfaces';
import { FilmService } from './film.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-movie',
    template: `
      <h1>Routed Movie Component</h1>

      <div>
        <button (click)="previousMovie()">Previous</button>

        <span *ngIf="currentMovie | async as movie; else noMovie" >
            ({{movie.id}}) {{movie.title }}
        </span>

        <ng-template #noMovie>
            <span><i>No Movie</i></span>
        </ng-template>

        <button (click)="nextMovie()">Next</button>
      </div>
    `,
    providers: [ FilmService ],
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
    private currentId: number;
    public currentMovie: Observable<Movie>;
    private routerEventsSubscription: Subscription;

    constructor(
        private filmService: FilmService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        // Listen to the router do its thing
        // What is `routerEventsSubscription`?
        this.routerEventsSubscription = router.events.subscribe(event => {
            console.log('Router event: ', event);
        })
    }

    ngOnInit(): void {
        console.log('MovieComponent initialized');

        // Get new movie whenever the URL's id changes
        // Question: How can the id change?
        this.currentMovie = this.route.paramMap.pipe(
            switchMap(params => {
              const id = +params.get('id');
              return this.filmService.getFilm(id).pipe(
                // Question: how could movie be undefined?
                tap(movie => this.currentId = movie && movie.id)
              )
            })
        );
    }

    ngOnDestroy(): void {
        console.log('MovieComponent destroyed');

        // Question: Why must we unsubscribe from the router?
        // Question: Why do we NOT unsubscribe from `route.paramMap`
        this.routerEventsSubscription.unsubscribe();
    }

    nextMovie() {
        this.currentId = this.currentId ? this.currentId + 1 : 1;
        this.router.navigate([`/movie/${this.currentId}`]);
    }

    previousMovie() {
        this.currentId = this.currentId ? this.currentId - 1 : 1;
        this.router.navigate([`/movie/${this.currentId}`]);
    }
}
