import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeNeonComponent } from './se-neon.component';

describe('SeNeonComponent', () => {
  let component: SeNeonComponent;
  let fixture: ComponentFixture<SeNeonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeNeonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeNeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
