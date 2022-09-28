const express = require('express');
const app = express();
const port = 3301; //porta padrão
const mysql = require('mysql2');

app.use(express.json());

const cors = require("cors");

app.options("*", cors({ origin: 'http://127.0.0.1:5500', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://127.0.0.1:5500", optionsSuccessStatus: 200 }));

//Rota Default

//C - reate POST
//R - ead GET
//U - pdate PUT
//D - elete DELETE

app.get('/', (req, res) => res.json({ message: 'Funcionou a bagaça@' }));

//Rota para Listar os Alunos
app.get('/cliente', (req, res) => {
    execSQLQuery('SELECT * FROM cliente', res);
    // sequelize.findAll(Entidade Aluno);
})

//Rota para Listar apenas um Aluno
app.get('/aluno/:id?', (req, res) => {
    execSQLQuery('SELECT * FROM aluno WHERE id = ' + req.params.id, res);
})

//Rota para Cadastrar Aluno
app.post('/cliente', (req, res) => {
  const {nome,sobrenome,cpf,tel,marca} = req.body;
  if (sobrenome) {
    execSQLQuery(`INSERT INTO cliente(nome,sobrenome,cpf,tel,marca) VALUES('${nome}','${sobrenome}','${cpf}','${tel}','${marca}')`, res);
  } else {
    execSQLQuery(`INSERT INTO cliente(nome) VALUES('${nome}')`, res);
  }
  // sequelize.create(Entidade Aluno, req.body);
});

//Rota para listar Cursos
app.get('/curso', (req, res) => {
  execSQLQuery('SELECT * FROM curso', res);
})







function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : '0.0.0.0',
    port     : 3306,
    user     : 'root',
    password : 'ONL87KIN',
    database : 'dbback'
  });
 
  connection.query(sqlQry, (error, results, fields) => {
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou normalmente');
  });
}

//inicia o servidor
app.listen(port);
console.log('API funcionando!');