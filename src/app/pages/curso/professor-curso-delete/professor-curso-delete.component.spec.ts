import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCursoDeleteComponent } from './professor-curso-delete.component';

describe('ProfessorCursoDeleteComponent', () => {
  let component: ProfessorCursoDeleteComponent;
  let fixture: ComponentFixture<ProfessorCursoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorCursoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorCursoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
