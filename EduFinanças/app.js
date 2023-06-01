const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'thiago',
  password: '123',
  database: 'edu'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados');
});

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração do EJS como view engine
app.set('view engine', 'ejs');

// Rota para exibir a página de login
app.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Rota para exibir a página inicial (home)
app.get('/', (req, res) => {
    res.render('home');
  });

  // Rota para processar o formulário de login
  app.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    db.query('SELECT * FROM usuarios WHERE email = ?', email, (err, results) => {
      if (err) {
        throw err;
      }
  
      if (results.length === 0) {
        res.send('Usuário não encontrado');
      } else {
        const usuario = results[0];
        if (usuario.senha === senha) {
          res.send('Login bem-sucedido');
        } else {
          res.send('Senha incorreta');
        }
      }
    });
  });
  

// Rota para exibir o formulário de cadastro
app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

// Rota para processar o formulário de cadastro
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  const usuario = { nome, email, senha };
  
  db.query('INSERT INTO usuarios SET ?', usuario, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Usuário cadastrado com sucesso');
    res.redirect('/');
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
