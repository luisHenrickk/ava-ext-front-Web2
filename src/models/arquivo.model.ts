import { Aula } from './aula.model';

export interface Arquivo {
  id: number;
  descricao: string;
  aula: Aula;
}
