import { Aluno } from './aluno.model';
import { Modulo } from './modulo.model';
import { Questao } from './questao.model';

export interface Avaliacao {
  id: number;
  metodoAvaliativo: string;
  descricao: string;
  nota?: number;
  questoes?: Questao[];
  modulo: Modulo;
  aluno?: Aluno;
}
