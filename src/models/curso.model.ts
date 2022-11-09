import { Aluno } from './aluno.model';
import { Modulo } from './modulo.model';
import { Professor } from './professor.model';

export interface Curso {
  id: number;
  descricao: string;
  area: string;
  alunos?: Aluno[];
  professor?: Professor;
  modulos?: Modulo[];
}
