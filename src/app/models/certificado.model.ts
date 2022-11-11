import { Professor } from './professor.model';

export interface Certificado {
  id: number;
  areaCertificado: string;
  link: string;
  professor: Professor;
}
