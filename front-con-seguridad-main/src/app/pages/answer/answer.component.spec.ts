import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerComponent } from './answer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswerComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AnswerComponent', () => {
    expect(component).toBeTruthy();
  });
});
