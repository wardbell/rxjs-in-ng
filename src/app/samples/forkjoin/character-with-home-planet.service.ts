// A snippet of code that we could turn into a sample that demonstrates forkJoin
//
// Uses forkJoin to resolve related child entities from a foreign key
// for each of an array of parent entities.
//
// Discovered during workshop at ngConf 2018
// forkJoin, like Promise.all(), waits for all of its observables to complete
// before returning their results in an array
import { HttpClient } from '@angular/common/http';

import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { People, RootPeople, Planet } from '../sw-interfaces';
import { SwUrlService } from '../sw-url.service';

interface CharacterWithPlanet extends People {
  homePlanet?: Planet;
}

export class CharacterWithHomePlanetService {

  peopleUrl = `https://swapi.co/api/people/`;

  // get SW characters
  getCharacters(): Observable<People[]> {
    return this.http
    .get<RootPeople>(this.peopleUrl)
    .pipe(
      map(data => data.results),
      // ignore error and return empty array of People
      catchError(() => of([])),
    );
  }

  // get a homeworld planet via the url
  getHomePlanet(homeworldUrl: string): Observable<Planet> {
    return this.http.get<Planet>(homeworldUrl);
  }

  // SW characters with their homeworld planets
  // Demonstrates forkJoin but also
  // demonstrates a bad practice because it makes as many calls for planets as there are characters
  getCharactersWithHomePlanets(): Observable<CharacterWithPlanet[]> {
    return this.getCharacters().pipe(

      mergeMap(characters => {
        // observable of observables, each getting a character's homeworld
        // and attaching that homeworld to the character.
        // An example of resolving a related entity from a foreign key
        const charactersWithHomePlanets$ = characters.map(character =>
          // get the homeworld for each character
          this.getHomePlanet(character.homeworld).pipe(

            // map each homeworld as a property of the character
            map(homePlanet => {
              // clone character with its homeworld
              return { ...character, homePlanet };
            }),

            // assume that it 404'd because there was no planet
            catchError((error: any) => {
              return of(character);
            })
          )
        );

        // wait until all of these observables complete
        // an emit the array of their character-with-homeworld results
        return forkJoin(charactersWithHomePlanets$);
      })
    );
  }

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

}
