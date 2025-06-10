import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalSignatureComponent } from './digitalsignature.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import 'jasmine';

describe('DigitalSignatureComponent', () => {
  let component: DigitalSignatureComponent;
  let fixture: ComponentFixture<DigitalSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalSignatureComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
