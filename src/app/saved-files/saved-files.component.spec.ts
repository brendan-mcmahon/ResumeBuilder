import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFilesComponent } from './saved-files.component';

describe('SavedFilesComponent', () => {
  let component: SavedFilesComponent;
  let fixture: ComponentFixture<SavedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
