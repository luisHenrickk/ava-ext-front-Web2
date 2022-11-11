import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCursoComponent } from './professor-curso.component';

describe('ProfessorCursoComponent', () => {
  let component: ProfessorCursoComponent;
  let fixture: ComponentFixture<ProfessorCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
