require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({ status: 'Central MKT API rodando perfeitamente!' });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/publicacoes', require('./routes/publicacoes.routes'));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});