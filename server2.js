const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Criar ou abrir o banco de dados SQLite
const db = new sqlite3.Database('./teste.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('Conectado ao SQLite');
    
    // Criar tabela USUARIOS se não existir
    db.run(`CREATE TABLE IF NOT EXISTS USUARIOS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      senha TEXT NOT NULL,
      nome TEXT NOT NULL
    )`);
  }
});

// Rota para autenticação de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM USUARIOS WHERE email = ? AND senha = ?';
  db.get(query, [email, senha], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      res.status(200).json({ message: 'Login bem-sucedido', user: row });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
});

// Rota para cadastro de usuários
app.post('/cadastro', (req, res) => {
  const { email, senha, nome } = req.body;

  const query = 'INSERT INTO USUARIOS (email, senha, nome) VALUES (?, ?, ?)';
  db.run(query, [email, senha, nome], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({ message: 'Usuário cadastrado com sucesso!', id: this.lastID });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
