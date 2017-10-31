

## Key benefits of observables

 - Lazy
 - Makes it easy to compose
 - Solve problems that are hard to solve another way
 - ? Angular returns them from it's API's

### Lazy,
This means that all the code you set up for an observable will not be ran before you subscribe to it. Its inert until needed. This is a _very_ important treat. The fastest code you have, is the code that's not executed. Observables make sure your code is only ran when it is _really_ needed.

### Makes it easy to compose
We all heard it, "prefer composing over inheritance". yeah, sure! But how? Well, __Observables.__ Those really make it easy to do this. Their are designed for this. Also they favor declarative over imperative. This means your code becomes easier to read and reason about, and by doing that it lowers the maintenance burden. (perhaps we need to deepen this a bit more)
    (not sure we should mention it favors functional programing).

### Solve problems that are hard to solve another way.
>"But, But.. I heard observables are hard by themselves"

Yeah, no, euhm, not really. There is a learning curve, we will not deny that. But they do make the _really hard_ things a lot easier.

Here is an auto-complete sample. The WikipediaService.load, is just a thin wrapper over HttpClient. There is a working version of this sample in the demo-app

```typescript
@Component({
    selector: 'app-wikipedia',
    template: `
    <div>
        <input type="text" [formControl]="searchTerm"/>
        <ul>
            <li *ngFor="let art of keyWords$|async" [title]='art.desc'><a [href]="art.url"  target="blank">{{art.title}}</a></li>
        </ul>
    </div>
  `,
    styles: []
})
export class WikipediaComponent implements OnInit {
    searchTerm = new FormControl();

    keyWords$ = this.searchTerm.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(searchTerm => this.wp.load(searchTerm))
        .map(this.checkForEmptyResult);

    constructor(private wp: WikipediaService) {}

    checkForEmptyResult(list) {
        return list.length !== 0 ? list : [{ title: '(no results)' }];
    }

    ngOnInit() {}
}
```

See, the sample. that is a 4 line autocomplete solution that does:

  - debounce the typing, so that not every key hits the endpoint
  - only does an request if there is an actual change in value (not on edit keys)
  - Deals with responses that come back out of order
  - cancels requests that are no longer needed




### things to mention (work out a tad more!)

  - producers (2 main kinds)
     - live (aka streams)
     - canned
  - consumers
  - operators




#
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
