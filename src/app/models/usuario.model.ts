export interface Usuario {
  id: number;
  email: string;
  senha?: string;
  role: string;
  access_token?: string;
  token_type?: string;
}

export interface LoginData {
  access_token?: string;
  token_type?: string;
}

export enum Role {
  Professor = 'professor',
  Aluno = 'aluno',
  Admin = 'admin',
}
