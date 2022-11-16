import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloEditComponent } from './modulo-edit.component';

describe('ModuloEditComponent', () => {
  let component: ModuloEditComponent;
  let fixture: ComponentFixture<ModuloEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
