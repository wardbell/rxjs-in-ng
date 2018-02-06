import {
    InMemoryDbService,
    RequestInfo,
    ResponseOptions
} from 'angular-in-memory-web-api';
import { Movie, People } from './sw-interfaces';

import { getSwFilms, getSwPeople } from './sw-data';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        return {
          swFilms: getSwFilms(),
          swPeople: getSwPeople()
        };
    }

    responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
        if (reqInfo.collectionName === 'swFilms' ||
            reqInfo.collectionName === 'swPeople' ) {
            const results: any = <any>resOptions.body;
            resOptions.body = {
                count: results ? results.length || 1 : 0,
                next: null,
                previous: null,
                results: results
            };
        }
        return resOptions;
    }
}
