import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCursoComponent } from './aluno-curso.component';

describe('AlunoCursoComponent', () => {
  let component: AlunoCursoComponent;
  let fixture: ComponentFixture<AlunoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
