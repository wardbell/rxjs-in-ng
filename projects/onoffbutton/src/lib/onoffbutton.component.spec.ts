import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnOffButtonComponent } from './onoffbutton.component';

describe('OnoffbuttonComponent', () => {
  let component: OnOffButtonComponent;
  let fixture: ComponentFixture<OnOffButtonComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [OnOffButtonComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OnOffButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
