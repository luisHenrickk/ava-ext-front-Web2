import { Aula } from './aula.model';
import { Avaliacao } from './avaliacao.model';
import { Curso } from './curso.model';

export interface Modulo {
  id: number;
  frequenciaMinima: number;
  descricao: string;
  nivel: string;
  curso: Curso;
  avaliacoes?: Avaliacao[];
  aulas?: Aula[];
}
