# Steps through the Samples

## Simple Films 1

- `HttpClient` observable API
- `HttpClient` & subscribe
- Show the service
- Show that you get no feedback on error

## Simple Films 2
- Handle error in subscribe
- Adds movie (see in the service)
- Show what happens when don’t subscribe to the `addHero` observable
- Must subscribe to execute. It’s like LINQ `toList()`.

## Simple Films 3
- Operators: `map` and `catchError` in the service
- Critical to present a user-friendly error even as you capture full error info for developers.
- Re-throw user-friendly error message
- Must handle with `catchError` in the component
- `AsyncPipe` (another Angular observable API) in the template
- `film$` is `Observable<Movie[]>` instead of `Movie[]`
- Catching errors and returning on the next channel this time
-`Old (<5.5) vs New (v5.5) RxJS syntax [in `old-chain-syntax` folder]

## Raw Observables

_Observables are just functions_.

- Create observable 
- The 3 channels: next, error, complete
- Versions:
  - v1: simple observable functions
  - v2: sync and async; errors
  - binding: how Angular binds to input box and keystrokes
  - v3: custom event observable (how `HttpClient` works)
  - v4: Observable creation functions (`fromEvent`, `of`, ...)
  - binding (again): from `keyup` to `keyup.enter`
  - v4 (again): `filter()` for _enter_ key

## Wikipedia
- Operators make chaining (piping) easy
- Operators can convert an observable of one type (`string`) to an observable of another type (`Movie[]`)
- `switchMap`:  operators that take value args (map) and “higher order” operators that take Observable args.
- `FormControl` to get changes for validation
- _Reactive Forms_: another Angular observable API
- `retryWhen` (go offline in the network tab)

## Router
- Another major Angular observable API
- Routed component re-use means `id` parameter changes during component lifetime
- `FilmService` - catching errors and returning on the "next channel"
- `ActivatedRoute` – no need to unsubscribe (explain why)
- `RouterEvents` – must unsubscribe (explain why; show how)

## Memory leaks and avoidance
- Show two slides on “_When to unsubscribe_”
- MemLeak example
- `RouterEvents` showed explicit `unsubscribe()` – good for ONE observable
- `HttpClient` is one-and-done so no real leak concern (although unsubscribe may be helpful)
- `AsyncPipe` takes care of sub/unsub for you.
- `takeUntil` – manage multiple observables. The canonical pattern of Angular components.

## Multistream
- Create a complex observable
- Blend multiple data sources into a single observable.
  - server
  - local server
  - current session

