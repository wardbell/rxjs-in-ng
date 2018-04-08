# RxJS in Angular

## Change

Developers cope with change.

Change comes in many forms. Changes to business requirements. Changes to the code.

We're talking about the changes that occur _within_ the application _during_ a user session.

Changes like:

* the user's keystrokes
* mouse moves
* button clicks
* changes to the screen as the user navigates through the app
* changes to the application state as the app retrieves and saves data.

## Change as a sequence of values

Each source of change comes at you as a _sequence of values_,
values _pushed_ at you over time,
from the moment the user starts the app until the moment she walks away.

Eventually you start connecting low level changes into higher order changes.

A sequence of keystrokes becomes a sequence of search terms.

These search terms have to be piped to requests for particular data ... like Heroes, or Orders.
Now you have a sequence of heroes, a sequence of orders.

They start to overlap with each other as you combine sequences from different sources into a satisfying user experience.

After you've done this enough, patterns start to emerge.

Some folks found a higher order pattern for dealing with complex sequences of events and for combining several sequences into a new sequence.

They called this pattern _Observables_.

## Observables are like arrays

You all know about arrays which we can think of as _sequences_ of values _in space_.

These values can have any shape.

```
[1, 2, 3]
[{id: 1}, {id: 2}, {id: 3}]
[ [1, 2, 3], [4], [5, 6, 7]]
```

You **_pull_** values out of arrays as you need them.

```
someArray[2]
```

Observables are kind of like arrays.
But they are _sequences_ of values _in time_.

We can draw them too, with dashes to represent the passage of time

```
---1-----2--3--|
```

That's

* 3 ticks of the clock,
* the event with value `1`,
* 4 ticks,
* the value `2`,
* 2 more ticks,
* the value `3`,
* 2 more ticks,
* the "complete" signal.

"Complete" is like the end of an array.
It means that the observable won't be "emitting" any more events.

Array values are always ready to be accessed.
You can pull a value from anywhere in the array
whenever you want to.

Unlike arrays, we can't "pull" values from an observable.
The values of an observable are events. They don't exist ahead of time the way numbers in an array are.
You can't pull a keystroke that the user hasn't typed yet.
Observable values become available when they happen.

So we have to wait for the observable to "push" values to our code.

Observable values are **_pushed_** at us and we **_listen_** for them by **_subscribing_** to the observable.

_Space_ versus _time_, _push_ versus _pull_, these are important differences.

Nonetheless, observables _feel_ array-like and the array analogy can help us understand how observables work.

We'll explore that analogy more deeply later when we start manipulating observables in much the same way as we manipulate arrays.

## Angular's RxJS Observable APIs

_Observable_ is a _pattern_.

The RxJS library is _one_ implementation of that pattern.
It happens to be the most successful Observable library in JavaScript.
Most importantly for us, it's the Observable library that Angular adopted.

Today we'll learn some RxJS by seeing it at work in Angular apps.

Five major Angular APIs expose Observables.

1.  HttpClient
1.  asyncPipe
1.  EventEmitter
1.  Router
1.  ReactiveForms

We'll explore each of them in turn and let them teach us about Observables and RxJS.

We'll look at writing an Observable message bus to share information among loosely coupled components.

And we'll introduce ngrx, a library for managing state in Angular apps that is drawing increasing community interest.

## _HttpClient_: first look

You use `HttpClient` to fetch and save data from a server.

Here's how you might fetch heroes.

```
import { Observable } from 'rxjs/Observable`;
...
heroes$: Observable<Hero[]>;

getHeroes() {
 this.heroes$ = http.get('api/heroes');
}
```

The `$` on the end of the variable name is a common convention that tells the reader you are expecting an Observable $equence.

> Question: Does `http.get()` make a request to the server when we call `getHeroes`?

Answer: NO!

[we prove it]

An `Observable` does nothing until you **_execute it_**.
We say that execution is _deferred_.

This particular `Observable` is an object that captures your intention to get data via HTTP.
As we'll see, you can refine your intention by adding additional operators to change behavior ... like logging the result, transforming the data, catching errors, canceling before it completes, retrying if the connection is bad, etc.

These are all things you might want to set up _before_ actually getting the data.

**Remember: Nothing happens until you execute the `Observable`.**

You execute an `Observable` by **subscribing** to it, perhaps like this:

```
heroes$: Observable<Hero[]>;
heroes: Hero[];

getHeroes() {
 this.heroes$ = http.get('api/heroes');

 this.heroes$.subscribe(data => this.heroes = data);
}
```

In the `subscribe()` callback we get the HTTP response data and assign it to the `heroes` property which, this time, is the array of heroes that we'd show on screen.

```
<li *ngFor="let hero of heroes">{{hero.name}}</li>
```

> If you come from the land of .NET, this should remind you of LINQ.
> Execution of a LINQ query object is deferred, giving you time to refine the query with LINQ operators.
> You execute the query by calling one of its terminal execution methods such as `toList()`.

Let's try saving a new hero this time.

```
addHero(newHero: Hero) {
 http.put('api/heroes', newHero);
}
```

> Question: when you call `addHero`, does it save the hero to the database?

Answer: NO!

Every `HttpClient` method returns an `Observable`.
The `put` method returns an `Observable`.
We don't seem interested in it but it's there nonetheless.

An `Observable` defers execution until it is subscribed.
If you want to save the new hero, you must `subscribe`:

```
addHero(newHero: Hero) {
 http.put('api/heroes', newHero).subscribe(); // I don't care about the result
}
```

### Errors

Something could go wrong. Maybe you have the wrong URL or you lost your connection.

You handle such errors in the second argument to `subscribe()`.

```
this.heroes$.subscribe(
  data => this.heroes = data,                         // happy path
  error  => console.error('getHeroes failed:', error) // sad path
);
```

### Values of an Observable

> Question: What are the values of the observable returned by `get('api/heroes')`?
>
> We know the HTTP response contains multiple heroes.
>
> Will the Observable yield each `hero` as a separate value in multiple events?
>
> Or will it yield the response's entire _array of heroes_ as a single value in a single event?

Answer: as an _array of heroes_ in a single event.

The values of an Observable can have any shape.

Because Observables yield a sequence of values _over time_ we call those values _events_.

You might say that an event has a "payload". That payload could be anything.

```
1                       // a number
"some string"           // a string
[1, 2, 3]               // an array
{id: 42, name: 'Harry'} // an object
```

Look again at the `heroes$` declaration.

```
heroes$: Observable<Hero[]>;
```

The type parameter tells you that we're expecting the observable to emit _arrays of heroes_, not individual heroes.

## Can I stop now?

You know enough RxJS now to get by with 90% of the Angular RxJS APIs.

You know that

* an Observable describes a sequence of values arriving over time.

* the Observable won't emit values until you `subscribe` to it.

* you can do something with an emitted value in a `subscribe` callback.

* you can handle an error in a second `subscribe` callback.

* an Observable value can have any shape.

You don't know _deeply_ what's going on.
Maybe that's OK for now.
You've got limited time and other stuff to master.

But you're invited to stay and learn a little more.

## _asyncPipe_

In our previous example, we subscribed manually.
In our callback we pushed the data from the HTTP response into a component property and bound it to the component template.

Angular can take care of those steps for us with the `asyncPipe`.

Let's roll back the `getHero` method to its original form, the one that returned the `Observable` without executing it.

```
heroes$: Observable<Hero[]>;

getHeroes() {
 this.heroes$ = http.get('api/heroes');
}
```

Now let Angular's `asyncPipe` do the work of subscribing and presenting the heroes.

```
<li *ngFor="let hero of heroes$ | async">{{hero.name}}</li>
```

Here's roughly what happens.

* Angular passes the `heroes$` observable to the `asyncPipe`.

* The `asyncPipe` subscribes.

* When the HTTP response arrives, the `heroes$` observable emits the heroes and the `asyncPipe`'s subscribe callback assigns them to a hidden template variable.

* `ngFor` iterates over that variable as it did previously for `heroes`.

### Errors

What if the HTTP request fails?

The `asyncPipe` silently discards the error and the screen stays blank.

Maybe you'd like to log the error as before.
You can, with the help of an RxJS operator called `catch`.

```
import { Observable } from 'rxjs/Observable`;
import 'rxjs/add/operator/catch';
...
heroes$: Observable<Hero[]>;

getHeroes() {
 this.heroes$ =
   http.get('api/heroes')
       .catch(error  => console.error('getHeroes failed:', error);
}
```

#### Chain the `catch` operator

We chained a `catch` operator to the end of the `http.get()` observable and assign the operator's output to `heroes$`.

`Observable` operators take a source observable, transforms its values in some way, and return them in a new observable.

The `catch` operator intercepts _failed_ source observables. If the source observable emits a value, the output observable re-emits that value. If the source observable fails, the `catch` operator passes the error to the `catch` callback and emits whatever your callback returns (nothing in this case).

Reminder: `getHeroes()` does not execute the HTTP query. The `asyncPipe` does that when it subscribes to `heroes$`.

#### Import operators

We hope you noticed the imported `catch` operator.

```
import 'rxjs/add/operator/catch';
```

The RxJS `Observable` class doesn't have a `catch` method.

You have to import the `catch` method, using that strange `import` syntax.

## RxJS in Practice

Let's stop for a moment to talk about

* what RxJS operators are
* why you import them explicitly
* what happens when you do.

### Arrays and Operators

You iterate over arrays with JavaScript `for` and do almost anything in the `for` loop body.

But most of us appreciate the compact and expressive convenience of JavaScript's **_array operators_**.

```
Array.map()    // map into a new array of transformed values
Array.concat() // concatenate values of two arrays into a single array
Array.slice()  // copy a portion of an array into another array
```

These operators easily compose, with method chaining, to produce new arrays

```
// combine two arrays,
// add 10 to each item, and
// take the 2nd through 4th items
let x = array.concat(anotherArray)
             .map(item => item + 10)
             .slice(1, 4);
```

### RxJS and Operators

An Observable library brings these ideas to sequences of events.

You might know about a library called [`lodash`](https://lodash.com/) that adds even more array _operators_

Some people call RxJS the **_lodash of observables_** because it treats an observable as an array-like object with loads of lodash-like _operators_ to help you compose new observables.

```
Observable.map()    // map into a new observable of transformed values
Observable.concat() // concatenate values of two observables into a single observable
Observable.take(m)  // take the first `m` values
Observable.skip(n)  // skip the next `n` values
```

Many Observable operators have the same names as Array operators.

> This can be confusing! Know whether you're operating on an array or an observable.

As with Array operators, you can chain Observable operators to produce a new Observable.

```
// combine values emitted by two observables,
// add 10 to each value, and
// keep the 2nd through 4th values
let x = source.concat(anotherObservable)
              .map(item => item + 10)
              .skip(1).take(3);
```

You'll learn about many of these `Observable` operators later in this talk.

### Importing `Observable` operators

The core RxJS `Observable` class has a handful of public members.
One of them is the `subscribe` method that executes the observable.

The `Observable` class doesn't have a `catch` method.
It doesn't have _any_ operator methods.

The RxJS documentation describes an enormous number of operators.
They're all useful to _someone_.
But you'll probably only use a few of them in your app.

The designers of RxJS understood this.
They also understood that you might not want to burden your application with a lot of unused operator code.

So they give you a lean version of `Observable` with the essential features
and ask you to add the operators you need, _a la carte_.

The syntax for adding operators is peculiar:

```
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
...
```

You're used to `import` statements with a symbol between brackets (`{}`) and a `from` as in

```
import { Observable } from 'rxjs';
```

Is _this_ even legal?

```
import 'rxjs/add/operator/catch';
```

Yes it is. It means "_load this JavaScript library but don't give me any symbols_".

In this example, the browser loads and executes `catch.js` file from the `node_modules/rxjs/add/operator/` folder.

`catch.js` adds the `catch` method to the `Observable` prototype so you can call `catch` from any observable instance.

### When do I import an operator? How often?

In principle you only have to import an operator one time.
Once the `Observable` is patched with `catch`, it's patched for life.

Running `catch.js` a second time won't hurt. But it doesn't change anything either. Why not run it once and forget about it?

Because you can never be sure at runtime that the `Observable` class has been patched with the operator you need _at the moment you need it_.

If no other file happened to add `catch` before your file executes,
you'll get a "method not found" error.

To avoid execution order dependencies and prevent this error, every file should import the operators it uses.

# MORE TO COME
