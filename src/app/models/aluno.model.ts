import { Aula } from './aula.model';
import { Avaliacao } from './avaliacao.model';
import { Curso } from './curso.model';
import { Telefone } from './telefone.model';
import { Usuario } from './usuario.model';

export interface Aluno extends Usuario {
  nome: string;
  cpf: string;
  dataNasc: string;
  telefones?: Telefone[];
  cursos?: Curso[];
  avaliacoes?: Avaliacao[];
  aulas?: Aula[];
}
