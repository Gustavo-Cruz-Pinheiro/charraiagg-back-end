const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, 'data', 'itens.json');

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Middleware para fazer parse do corpo das requisições como JSON
app.use(bodyParser.json());

// Endpoint para obter todos os itens
app.get('/api/itens', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler dados:', err);
      return res.status(500).json({ error: 'Erro ao ler dados' });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint para modificar o patrocinador de um item
app.put('/api/itens/:nomeItem', (req, res) => {
  const nomeItem = req.params.nomeItem;
  const novoPatrocinador = req.body.patrocinador;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler dados:', err);
      return res.status(500).json({ error: 'Erro ao ler dados' });
    }

    let itens = JSON.parse(data);
    const itemIndex = itens.findIndex(item => item.nome === nomeItem);

    if (itemIndex === -1) {
      return res.status(404).json({ error: `Item com nome '${nomeItem}' não encontrado` });
    }

    itens[itemIndex].patrocinador = novoPatrocinador;

    fs.writeFile(dataFilePath, JSON.stringify(itens, null, 2), err => {
      if (err) {
        console.error('Erro ao salvar dados:', err);
        return res.status(500).json({ error: 'Erro ao salvar dados' });
      }
      res.json({ message: 'Patrocinador modificado com sucesso', item: itens[itemIndex] });
    });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
