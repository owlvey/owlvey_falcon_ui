import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSquadComponent } from './list-squad.component';

describe('ListSquadComponent', () => {
  let component: ListSquadComponent;
  let fixture: ComponentFixture<ListSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
