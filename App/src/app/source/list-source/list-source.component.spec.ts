import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSourceComponent } from './list-source.component';

describe('ListProductComponent', () => {
  let component: ListSourceComponent;
  let fixture: ComponentFixture<ListSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
