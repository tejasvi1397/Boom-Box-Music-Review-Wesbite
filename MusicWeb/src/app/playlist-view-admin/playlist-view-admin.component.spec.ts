import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistViewAdminComponent } from './playlist-view-admin.component';

describe('PlaylistViewAdminComponent', () => {
  let component: PlaylistViewAdminComponent;
  let fixture: ComponentFixture<PlaylistViewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistViewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
