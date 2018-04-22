import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { Movie } from '../../samples/sw-interfaces';
import { FilmService } from './film.service';

@Component({
  selector: 'app-movie',
  template: `
      <h1>Routed Movie Component</h1>

      <div>
        <button (click)="previousMovie()">Previous</button>

        <div *ngIf="currentMovie$ | async as movie; else noMovie"  class="title">
            ({{movie.id}}) {{ movie.title }}
        </div>

        <ng-template #noMovie>
            <div class="missing">No Movie</div>
        </ng-template>

        <button (click)="nextMovie()">Next</button>
      </div>
    `,
  providers: [FilmService],
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  currentMovie$: Observable<Movie>;

  currentId: number;
  nextId: number;
  previousId: number;

  routerEventsSubscription: Subscription;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.listenToRouteParams();
    this.listenToRouterEvents();
  }

  private listenToRouteParams() {
    // ActivatedRoute.paramMap observable changes whenever the URL's id changes
    this.currentMovie$ = this.route.paramMap.pipe(

      // extract film id parameter
      map(params => params.get('id')),

      // switchMap because can discard in-flight request for a new id
      switchMap(id => {
        return this.filmService.getFilm(id).pipe(
          tap(movie => this.currentId = movie ? movie.id : 0)
        );
      })
    );
  }

  nextMovie() {
    this.navigate(this.currentId + 1);
  }

  previousMovie() {
    this.navigate(this.currentId - 1);
  }

  navigate(id: number) {
    id = id || 1;
    this.router.navigate([`/movie/${id}`]);
  }




  /// ROUTER EVENTS ////
  private listenToRouterEvents() {
    // Listen to the router do its thing
    // What is `routerEventsSubscription`?
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      console.log('Router event: ', event);
    });
    console.log('MovieComponent initialized');
  }

  ngOnDestroy(): void {
    console.log('MovieComponent destroyed');

    // Question: Why must we unsubscribe from the router?
    // Question: Why do we NOT unsubscribe from `route.paramMap`
    this.routerEventsSubscription.unsubscribe();
  }

}
