import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserSquadComponent } from './create-user-squad.component';

describe('CreateUserSquadComponent', () => {
  let component: CreateUserSquadComponent;
  let fixture: ComponentFixture<CreateUserSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
