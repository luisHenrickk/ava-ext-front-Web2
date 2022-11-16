import { Aluno } from './aluno.model';
import { Professor } from './professor.model';

export interface Telefone {
  id: number;
  telefone: string;
  tipo: string;
  aluno?: Aluno;
  professor?: Professor;
}
