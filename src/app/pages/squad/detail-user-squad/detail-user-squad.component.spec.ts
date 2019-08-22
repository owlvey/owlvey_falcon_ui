import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserSquadComponent } from './detail-user-squad.component';

describe('DetailUserSquadComponent', () => {
  let component: DetailUserSquadComponent;
  let fixture: ComponentFixture<DetailUserSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailUserSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUserSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
