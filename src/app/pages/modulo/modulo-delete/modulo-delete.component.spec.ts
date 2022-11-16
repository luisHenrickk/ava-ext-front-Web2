import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloDeleteComponent } from './modulo-delete.component';

describe('ModuloDeleteComponent', () => {
  let component: ModuloDeleteComponent;
  let fixture: ComponentFixture<ModuloDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
