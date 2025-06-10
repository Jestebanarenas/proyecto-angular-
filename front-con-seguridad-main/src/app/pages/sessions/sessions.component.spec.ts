import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionComponent } from './sessions.component';
import { SessionService } from 'src/app/services/sessions.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { Sessions } from 'src/app/models/sessions.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;
  let sessionService: jasmine.SpyObj<SessionService>;

  beforeEach(async () => {
    const sessionServiceSpy = jasmine.createSpyObj('SessionService', ['getSessionsByUserId', 'endSession']);
    sessionServiceSpy.getSessionsByUserId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ SessionComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SessionService, useValue: sessionServiceSpy },
        { provide: UserService, useValue: { getAll: jasmine.createSpy().and.returnValue(of([])) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    fixture.detectChanges();
  });

  it('should create the session component', () => {
    expect(component).toBeTruthy();
  });

  it('should load sessions on init', () => {
    const mockSessions: Sessions[] = [
      { id: 1, user: { id: 1, email: 'user1@example.com', password: '' }, startTime: new Date(), device: 'Desktop', status: 'active' },
      { id: 2, user: { id: 2, email: 'user2@example.com', password: '' }, startTime: new Date(), device: 'Mobile', status: 'inactive' }
    ];

    sessionService.getSessionsByUserId.and.returnValue(of(mockSessions));

    component.ngOnInit();

    expect(component.sessions.length).toBe(2);
    expect(component.sessions[0].user.email).toBe('user1@example.com');
    expect(component.sessions[1].status).toBe('inactive');
  });

  it('should call endSession when the end button is clicked', () => {
    const sessionId = 1;
    spyOn(sessionService, 'endSession').and.returnValue(of(undefined));

    component.endSession(sessionId);

    expect(sessionService.endSession).toHaveBeenCalledWith(sessionId);
  });
});
