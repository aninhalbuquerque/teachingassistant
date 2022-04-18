import { CadastroDeAlunos } from '../cadastrodealunos';
import { Aluno } from '../../common/aluno';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroDeAlunos;

  function cadastrarAluno(nome:string, cpf:string) {
    var aluno: Aluno = new Aluno();
    aluno.nome = nome;
    aluno.cpf = cpf;
    cadastro.cadastrar(aluno);
  }

  function atualizaAluno(nome?:string, cpf?:string, email?:string, metas?:Map<string,string>) {
    var aluno: Aluno = new Aluno();
    if (nome) aluno.nome = nome;
    if (cpf) aluno.cpf = cpf;
    if (email) aluno.email = email;
    if (metas) aluno.metas = metas;

    cadastro.atualizar(aluno);
  }

  function expectSoUmAluno() {
    expect(cadastro.getAlunos().length).toBe(1);
    var aluno = cadastro.getAlunos()[0];
    return aluno;
  }

  beforeEach(() => cadastro = new CadastroDeAlunos())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("cadastra alunos corretamente", () => {
    cadastrarAluno("Mariana","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("");
    expect(aluno.metas.size).toBe(0);
  })

  it("não aceita alunos com CPF duplicado", () => {
    cadastrarAluno("Mariana","683");
    cadastrarAluno("Pedro","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
  })

  it("cadastra e atualiza alunos corretamente", () => {
    cadastrarAluno("Mariana","683");

    atualizaAluno("Ana", "683", "alas3");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Ana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("alas3");
    expect(aluno.metas.size).toBe(0);
  })

})


