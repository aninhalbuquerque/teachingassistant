import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];

    cadastrar(aluno: Aluno): any {
      var result = null;
      if (this.cpfCadastrado(aluno.cpf)) return result;
      //if (this.gitCadastrado(aluno.github)) return 'git';

      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
      return result;
    }

    deletar(cpf: string): any {
      if (this.cpfCadastrado(cpf)){
        this.alunos = this.alunos.filter(a => a.cpf !== cpf);
        return cpf;
      }

      return null;
    }

    cpfCadastrado(cpf: string): boolean {
      return this.alunos.find(a => a.cpf == cpf) ? true : false;
    }

    gitCadastrado(github: string): boolean {
      return this.alunos.find(a => a.github == github) ? true : false;
    }

    atualizar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
     if (result) result.copyFrom(aluno);
     return result;
   }

    getAlunos(): Aluno[] {
     return this.alunos;
   }
}