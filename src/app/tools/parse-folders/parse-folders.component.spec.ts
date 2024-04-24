import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseFoldersComponent } from './parse-folders.component';

describe('ParseFoldersComponent', () => {
  let component: ParseFoldersComponent;
  let fixture: ComponentFixture<ParseFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParseFoldersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParseFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
