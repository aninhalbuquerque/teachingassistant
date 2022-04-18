import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

  @Component({
   selector: 'app-root',
   templateUrl: './alunos.component.html',
   styleUrls: ['./alunos.component.css']
 })
 export class AlunosComponent implements OnInit {

    aluno: Aluno = new Aluno();
    alunos: Aluno[] = [];
    cpfduplicado: boolean = false;
    gitduplicado: boolean = false;
    errodelete: boolean = false;

    constructor(private alunoService: AlunoService) {}

     criarAluno(a: Aluno): void {
       this.alunoService.criar(a)
              .subscribe(
                ar => {
                  if (ar === 'cpf') {
                    this.cpfduplicado = true;
                  } else if (ar === 'git') {
                    this.gitduplicado = true;
                  } else {
                    this.alunos.push(ar);
                    this.aluno = new Aluno();
                  }
                },
                msg => { alert(msg.message); }
              );
    } 

    deletarAluno(a: Aluno): void {
      this.alunoService.deletar(a)
              .subscribe(
                ar => {
                  if (ar) {
                    this.alunos = this.alunos.filter(a => a.cpf !== ar.cpf);
                  } else {
                    this.errodelete = true;
                  }
                },
                msg => { alert(msg.message); }
              );
    }

    onMove(): void {
       this.cpfduplicado = false;
       this.gitduplicado = false;
       this.errodelete = false;
    }

     ngOnInit(): void {
       this.alunoService.getAlunos()
             .subscribe(
               as => { this.alunos = as; },
               msg => { alert(msg.message); }
              );
     }

  }