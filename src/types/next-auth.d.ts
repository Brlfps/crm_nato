import 'next-auth';

declare module 'next-auth' {
  interface Session {
    token: string;
    expires: Date | string;
    user: {
      Financeira: any;
      id: number;
      name: string;
      email: string;
      cpf: string;
      construtora: construtora[];
      telefone: string;
      empreendimento: empreendimento[];
      hierarquia: string;
      cargo: string;
      reset_password: boolean;
    }
  }

  interface construtora {
    id: number;
    cnpj: string;
    razaosocial: string;
    responsavel: string;
    email: string;
    tel: string;
    tipo: string;
    colaboradores: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  interface empreendimento {
    id: number;
    nome: string;
    ativo: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    chave: string;
    cidade: string;
    uf: string;
    dt_inicio: Date | string;
    dt_fim: Date | string;
  }
}

