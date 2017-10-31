import { Injectable } from '@angular/core';

@Injectable()
export class SwUrlService {
  private _url: string;
  private _urlGood = false;

  get isGood() {
    return this._urlGood;
  }

  get url() {
    return this._url || this.toggleUrl();
  }

  toggleUrl(good?: boolean) {
    // tslint:disable-next-line:triple-equals
    this._urlGood = good == undefined ? !this._urlGood : good;
    this._url = this._urlGood ? 'api/swFilms' : 'api/not-the-api-url';
    console.log(this._url);
    return this._url;
  }
}
