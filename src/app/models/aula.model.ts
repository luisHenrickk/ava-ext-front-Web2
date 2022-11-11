import { Aluno } from './aluno.model';
import { Arquivo } from './arquivo.model';
import { Modulo } from './modulo.model';

export interface Aula {
  id: number;
  descricao: string;
  duracao: string;
  arquivos?: Arquivo[];
  modulo: Modulo;
  alunos?: Aluno[];
}
