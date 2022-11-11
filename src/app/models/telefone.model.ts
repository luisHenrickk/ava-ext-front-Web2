import { Aluno } from './aluno.model';

export interface Telefone {
  id: number;
  telefone: string;
  tipo: string;
  aluno?: Aluno;
}
