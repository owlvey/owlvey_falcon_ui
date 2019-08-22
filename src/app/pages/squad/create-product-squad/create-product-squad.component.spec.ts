import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductSquadComponent } from './create-product-squad.component';

describe('CreateProductSquadComponent', () => {
  let component: CreateProductSquadComponent;
  let fixture: ComponentFixture<CreateProductSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
