import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceComponent } from './device.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('DeviceComponent', () => {
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DeviceComponent', () => {
    expect(component).toBeTruthy();
  });
});
