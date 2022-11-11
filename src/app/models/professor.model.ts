import { Certificado } from './certificado.model';
import { Curso } from './curso.model';
import { Telefone } from './telefone.model';
import { Usuario } from './usuario.model';

export interface Professor extends Usuario {
  nome: string;
  cpf: string;
  dataNasc: string;
  graduacao: string;
  telefones: Telefone[];
  cursos?: Curso[];
  certificados: Certificado[];
}
