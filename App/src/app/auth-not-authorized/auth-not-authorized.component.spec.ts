import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNotAuthorizedComponent } from './auth-not-authorized.component';

describe('AuthNotAuthorizedComponent', () => {
  let component: AuthNotAuthorizedComponent;
  let fixture: ComponentFixture<AuthNotAuthorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthNotAuthorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNotAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
