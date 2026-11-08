const express = require('express');
const router = express.Router();
const publicacaoController = require('../controllers/publicacaoController');

router.get('/publicacoes', publicacaoController.listar);
router.post('/publicacoes', publicacaoController.criar);

module.exports = router;