import { Observable } from 'rxjs';

import { of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

export type RetryWhenNotifier = (errors: Observable<any>) => Observable<any>;

/**
 * Create an Observable.retryWhen notifier
 *
 * @param appEventBus
 * @param svcName
 * @param url
 *
 * Can use with JSONP but please note
 * JSONP isn't an XHR call so it has no failure info even though
 * a JSONP error presents as an XHR Response.
 * Let's pretend it is an XHR response.
 */
export function createRetryWhenNotifier(svcName?: string, url?: string): RetryWhenNotifier {

  let retries = 0;
  svcName = svcName || 'Service';
  url = url || '';

  const svcErrName =  svcName + ' error';

  return (errors: Observable<Response>) => errors.pipe(
    tap(err => {
      console.error('retryWhenNotifier', err)
    }),
    switchMap(err => {

      // No point in retrying if the URL isn't recognized
      if (err.status === 404) {
        console.error(svcName + ' error', `Url ${url} not found.`);
        throw err;

      // Rethrow error if retried 3 times and failed
      } else if (retries++ === 3) {
          console.error('Retried 3 times. No luck');
          throw err;

      // Progressive retry (each retry takes a second longer)
      // by returning an observable with a delay
      } else {
        console.log(svcName, 'Retry #' + retries);
        return of(null).pipe(delay(1000 * retries));
      }
    })
  );

}
