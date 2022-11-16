import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCreateComponent } from './modulo-create.component';

describe('ModuloCreateComponent', () => {
  let component: ModuloCreateComponent;
  let fixture: ComponentFixture<ModuloCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
