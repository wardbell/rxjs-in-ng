import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RakiObject, CollectionObject, ArtObject } from 'src/app/rijks/rakiCollection';

const key = '4a3Fxmua';
const serialize = o => Object.keys(o).reduce((search, key) => (search += `${key}=${encodeURIComponent(o[key])}&`), '');
const collection = searchObj => `https://www.rijksmuseum.nl/api/en/collection/?${serialize(searchObj)}key=${key}&format=json`;

const detail = detailNumber => `https://www.rijksmuseum.nl/api/en/collection/${detailNumber}?key=${key}&format=json`;

@Injectable()
export class RakiService {
  private artCount = 4000;
  private detailNumber = new Subject<string | undefined>();

  detail$: Observable<RakiObject.ArtDetailObject[]> = this.detailNumber.switchMap(
    number => (number ? this.http.get<RakiObject.RootObject>(detail(number)).map(r => [r.artObject]) : Observable.of([]))
  );

  private selection = {
    p: 0,
    ps: 1,
    type: 'painting'
  };

  randomImage$ = this.http
    .get<CollectionObject>(collection(this.selection))
    .do(r => (this.artCount = r.count))
    .switchMap(() => Observable.timer(0, 10000))
    .switchMap(() => this.getArtObject$)
    .switchMap(artObject => Observable.fromPromise(this.preload(artObject.webImage.url)));

  private getArtObject$: Observable<ArtObject> = Observable.create(obs => {
    obs.next({
      ...this.selection,
      p: Math.floor(Math.random() * this.artCount)
    });
    obs.complete();
  })
    .switchMap(selection =>
      this.http
        .get<CollectionObject>(collection(selection))
        .map(r => r.artObjects[0])
        .catch((e): Observable<ArtObject> => Observable.timer(500).switchMap((): Observable<ArtObject> => this.getArtObject$))
    )
    .switchMap(artObject => (artObject.webImage && artObject.webImage.url ? Observable.of(artObject) : this.getArtObject$));

  constructor(private http: HttpClient) {}

  loadDetail(objectNumber: string | undefined) {
    this.detailNumber.next(objectNumber);
  }

  artist(q) {
    console.log(q, serialize({ q }));
    return this.http
      .get<CollectionObject>(collection({ q }))
      .map(r => r.artObjects)
      .map(artObjects => artObjects.reduce((acc, e) => (e.hasImage ? acc.concat(e) : acc), []))
      .do(r => console.log(r));
  }

  private preload(url) {
    return new Promise((resolve, reject) => {
      const resolveWithUrl = () => resolve(`url(${url})`);
      const img = document.createElement('img');
      img.addEventListener('load', resolveWithUrl);
      img.addEventListener('error', reject);
      img.src = url;
    });
  }
}
