const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost', // ou seu servidor remoto
  user: 'root',
  password: 'rootpassword',
  database: 'teste'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para registro de usuário
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  const query = 'INSERT INTO USUARIOS (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, senha], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao registrar usuário.', error: err });
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  });
});

// Rota para login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  const query = 'SELECT * FROM USUARIOS WHERE email = ? AND senha = ?';
  db.query(query, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer login.', error: err });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  });
});

// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});