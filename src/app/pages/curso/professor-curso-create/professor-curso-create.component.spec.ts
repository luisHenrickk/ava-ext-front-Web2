import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCursoCreateComponent } from './professor-curso-create.component';

describe('ProfessorCursoCreateComponent', () => {
  let component: ProfessorCursoCreateComponent;
  let fixture: ComponentFixture<ProfessorCursoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorCursoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorCursoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
