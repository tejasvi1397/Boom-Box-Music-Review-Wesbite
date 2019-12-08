import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySongStatusComponent } from './modify-song-status.component';

describe('ModifySongStatusComponent', () => {
  let component: ModifySongStatusComponent;
  let fixture: ComponentFixture<ModifySongStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySongStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySongStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
