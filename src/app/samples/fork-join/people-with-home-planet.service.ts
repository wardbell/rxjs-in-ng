// A snippet of code that we could turn into a sample that demonstrates forkJoin
//
// Uses forkJoin to resolve related child entities from a foreign key
// for each of an array of parent entities.
//
// Discovered during workshop at ngConf 2018
// forkJoin, like Promise.all(), waits for all of its observables to complete
// before returning their results in an array
// tslint:disable:member-ordering
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, concat, forkJoin, of } from 'rxjs';
import { catchError, expand, ignoreElements, map, mergeMap, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { People, Planet, RootPeople } from '../sw-interfaces';
import { SwUrlService } from '../sw-url.service';



interface PersonWithPlanet extends People {
  homePlanet?: Planet;
}

interface Planets {
  [url: string]: Observable<Planet>;
}

@Injectable()
export class PeopleWithHomePlanetService {

  // load a page of people
  loadPeople = (url: string): Observable<RootPeople> =>
    this.http
      .get<RootPeople>(url).pipe(
        catchError(() => of(null))
      );

  // load all people from the paged API
  // start off with loading the first page.
  people$: Observable<People[]> = this.loadPeople(`https://swapi.co/api/people/`).pipe(

    // expand to get additional pages
    // hint: r.next means there's another page
    expand(r => r.next ? this.loadPeople(r.next) : EMPTY),

    // for each page, extract the people (in results)
    map(r => r.results),

    // accumulate the pages (emitted by expand)
    // reduce((allPeople, pageOfPeople) => allPeople.concat(pageOfPeople), []),
    scan((allPeople, pageOfPeople) => allPeople.concat(pageOfPeople), [] as People[]),

    // Share the result with all subscribers
    shareReplay(1)
  );

  /** Cache of planets */
  planetsCache = new Map<string, Observable<Planet>>();

  // get a homeworld planet via the url
  // from the cache of planets or from the server
  loadHomePlanet = (homeworldUrl: string): Observable<Planet> => {
    // use a cahce to prevent prevent double urls.
    if (this.planetsCache.has(homeworldUrl)) {
      return this.planetsCache.get(homeworldUrl);
    }
    return this.http
      .get<Planet>(homeworldUrl).pipe(
        catchError (error => {
          const missing: Observable<Planet> =
            of( <any> { name: 'Unknown', url: homeworldUrl });
          return  missing;
        }),
        // use a side-effect to fill the cache
        tap(homeWorld => this.planetsCache.set(homeworldUrl, of(homeWorld)))
      );
  }

  // SW people with their homeworld planets
  // Demonstrates forkJoin but also
  // demonstrates a bad practice because it makes as many calls for planets as there are people
  // Fortunately, the cache of planets reduces the number of server calls.
  peopleWithHomePlanets$: Observable<PersonWithPlanet[]> = this.people$.pipe(

    mergeMap(people => {
      // observable of observables, each getting a people's homeworld
      // and attaching that homeworld to the people.
      // An example of resolving a related entity from a foreign key
      const peopleAndPlanets$ = people.map(person =>

        // get the homeworld for each people
        this.loadHomePlanet(person.homeworld).pipe(

          // map each homeworld as a property of the people
          map(homePlanet => {
            // clone people with its homeworld
            return { ...person, homePlanet };
          }),
          // catchError is unneeded here, as the 404 is handled by loadHomePlanet?
        )
      );

      // wait until all of these observables complete
      // an emit the array of their people-with-homeworld results
      return forkJoin(peopleAndPlanets$);
    }),

    // sort them
    map(list => list.sort(byPlanetAndName)),
  );

  // Running count as people pages arrive
  count$ = this.people$.pipe(map(list => list.length), startWith(0));

  // Turn loading spinner on and off
  loading$ = concat(
    of(true),
    this.people$.pipe(ignoreElements()),
    of(false)
  );

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}
}


// Internals
function byPlanetAndName(x: PersonWithPlanet, y: PersonWithPlanet) {
  const planetCompare =
    (x.homePlanet ? x.homePlanet.name : '')  <
    (y.homePlanet ? y.homePlanet.name : '') ? -1 : 1 ;
  return planetCompare ? planetCompare : byName(x, y);
}

function byName(x: People, y: People) {
  return x.name < y.name ? -1 : 1;
}
