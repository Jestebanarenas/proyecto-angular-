import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityQuestionComponent } from './securityquestion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('SecurityQuestionComponent', () => {
  let component: SecurityQuestionComponent;
  let fixture: ComponentFixture<SecurityQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityQuestionComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SecurityQuestionComponent', () => {
    expect(component).toBeTruthy();
  });
});
