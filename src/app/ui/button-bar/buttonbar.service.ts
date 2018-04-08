import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap } from 'rxjs/operators';

export interface Button {
  title: string;
}

@Injectable()
export class ButtonbarService {
  private buttonSource = new Subject<Button>();

  public buttons$ = this.buttonSource.pipe(
    map(b => [b]),
    startWith([]),
    scan((acc, newButton) => acc.concat(newButton)),
    shareReplay(1)
  );

  private buttonsMap = new Map<string, Subject<MouseEvent>>();

  addButton(button: Button): Observable<MouseEvent> {
    return this.buttons$.pipe(
      switchMap(buttonList => {
        if (this.buttonsMap.has(button.title)) {
          return this.buttonsMap.get(button.title).asObservable();
        }
        const sj = new Subject<MouseEvent>();
        this.buttonsMap.set(button.title, sj);
        this.buttonSource.next(button);
        return sj.asObservable();
      })
    );
  }

  activate(button: Button, evt) {
    this.router
      .navigate(['/'])
      .then(() => this.buttonsMap.get(button.title).next(evt));
  }

  constructor(private router: Router) {
    this.buttons$.subscribe();
  }
}
