import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsReviewsViewComponent } from './songs-reviews-view.component';

describe('SongsReviewsViewComponent', () => {
  let component: SongsReviewsViewComponent;
  let fixture: ComponentFixture<SongsReviewsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsReviewsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsReviewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
