import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se � mesmo Aluno!
  var ret = cadastro.cadastrar(aluno);
  if (ret === 'cpf' || ret === 'git') {
    res.send({failure: "O aluno nao pode ser cadastrado", "err": ret});
  } else {
    res.send({success: "O aluno foi cadastrado com sucesso"});
  } 
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({success: "O aluno foi atualizado com sucesso"});
  } else {
    res.send({failure: "O aluno nao pode ser atualizado"});
  }
})

taserver.delete('/aluno/:cpf', function (req: express.Request, res: express.Response) {
  console.log('try');
  var cpf: string = <string> req.params.cpf;
  var ret = cadastro.deletar(cpf);
  if (ret) {
    res.send({success: "O aluno foi deletado com sucesso"});
  } else {
    res.send({failure: "O aluno nao pode ser deletado"});
  }
})

var server = taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }