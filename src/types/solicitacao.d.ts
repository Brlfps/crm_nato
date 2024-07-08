declare module solictacao {
  /**
   * SolicitacaoGetType
   * @param {number} id
   * @param {string} nome
   * @param {string} cpf
   * @param {string} email
   * @param {Date | string | any} dt_solicitacao
   * @param {object} corretor { id: number, nome: string }
   * @param {number} construtora
   * @param {string} telefone
   * @param {Date | string | any} dt_nascimento
   * @param {boolean} ass_doc
   * @param {string} link_doc
   * @param {number} id_fcw
   * @param {string} obs
   * @param {string} alert
   * @param {number} empreedimento
   * @param {string} cnh
   * @param {boolean} ativo
   * @param {string} uploadCnh
   * @param {string[]} relacionamento
   * @param {Date | string | any} createdAt
   * @param {Date | string | any} updatedAt
   * @param {string} telefone2
   * @param {string} uploadRg
   *
   */
  interface SolicitacaoGetType {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    dt_solicitacao: Date | string | any;
    corretor: {
      id: number;
      nome: string;
    };
    construtora: {
      id: number;
      razaosocial: string;
    };
    telefone: string;
    dt_nascimento: Date | string | any;
    ass_doc: boolean;
    link_doc: string;
    id_fcw: number;
    obs: string;
    alert: AlertProps[];
    empreendimento: {
      id: number;
      nome: string;
    };
    cnh: string;
    ativo: boolean;
    uploadCnh: string;
    relacionamento: string[];
    createdAt: Date | string | any;
    updatedAt: Date | string | any;
    telefone2: string;
    uploadRg: string;
  }

  /**
   * SolicitacaoPutType
   * @param {string} nome
   * @param {string} cpf
   * @param {string} email
   * @param {number} corretor
   * @param {number} construtora
   * @param {string} telefone
   * @param {Date | string | any} dt_nascimento
   * @param {boolean} ass_doc
   * @param {string} link_doc
   * @param {number | null} id_fcw
   * @param {string} obs
   * @param {string} alert
   * @param {number} empreedimento
   * @param {string} cnh
   * @param {string} uploadCnh
   * @param {string[]} relacionamento
   * @param {string} telefone2
   * @param {string} uploadRg
   *
   */
  interface SolicitacaoPutType {
    nome: string;
    cpf: string;
    email: string;
    corretor: number;
    construtora: number;
    telefone: string;
    dt_nascimento: Date | string | any;
    ass_doc: boolean;
    link_doc: string;
    id_fcw: number | null;
    obs: string;
    empreedimento: number;
    cnh: string;
    uploadCnh: string;
    relacionamento: string[];
    telefone2: string;
    uploadRg: string;
  }
  /**
   * AlertProps
   * @param {number} id
   * @param {string} titulo
   * @param {string} texto
   * @param {number} solicitacao_id
   * @param {number} corretor
   * @param {string} tipo
   * @param {string} tag
   * @param {number} empreendimento
   */
  interface AlertProps {
    id: number;
    titulo: string;
    texto: string;
    solicitacao_id: number;
    corretor: number;
    tipo: string;
    tag: string;
    empreendimento: number;
  }
}
