import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordLetterComponent } from './word-letter.component';

describe('WordLetterComponent', () => {
  let component: WordLetterComponent;
  let fixture: ComponentFixture<WordLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
