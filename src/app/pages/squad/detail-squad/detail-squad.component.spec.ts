import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSquadComponent } from './detail-squad.component';

describe('DetailSquadComponent', () => {
  let component: DetailSquadComponent;
  let fixture: ComponentFixture<DetailSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
