export interface Usuario {
  id: number;
  email: string;
  senha?: string;
  role: string;
  access_token?: string;
  token_type?: string;
}
