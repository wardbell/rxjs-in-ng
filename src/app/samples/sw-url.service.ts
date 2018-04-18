import { Injectable } from '@angular/core';

@Injectable()
export class SwUrlService {
  private _url = 'api/swFilms';
  private _urlGood = true;

  get isGood() {
    return this._urlGood;
  }

  get url() {
    return this._url || this.toggleUrl();
  }

  toggleUrl() {
    // tslint:disable-next-line:triple-equals
    this._urlGood = !this._urlGood;
    this._url = this._urlGood ? 'api/swFilms' : 'api/not-the-api-url';
    console.log(this._url);
    return this._url;
  }
}
