import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductSquadComponent } from './detail-product-squad.component';

describe('DetailProductSquadComponent', () => {
  let component: DetailProductSquadComponent;
  let fixture: ComponentFixture<DetailProductSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProductSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
