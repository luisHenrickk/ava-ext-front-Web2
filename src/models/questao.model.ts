import { Avaliacao } from './avaliacao.model';

export interface Questao {
  id: number;
  enunciado: string;
  resposta?: string;
  avaliacao: Avaliacao;
}
