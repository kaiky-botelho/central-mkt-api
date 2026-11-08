const express = require('express');
const router = express.Router();
const publicacaoController = require('../controllers/publicacaoController');

/**
 * @swagger
 * /api/publicacoes:
 *   get:
 *     summary: Lista todas as publicações
 *     tags: [Publicações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: mes
 *         schema:
 *           type: integer
 *         description: Filtrar por mês (ex 11)
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Filtrar por ano (ex 2026)
 *     responses:
 *       200:
 *         description: Lista de publicações retornada com sucesso
 *   post:
 *     summary: Cria o planeamento de uma nova publicação
 *     tags: [Publicações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               canal:
 *                 type: string
 *               formato:
 *                 type: string
 *               dataPlanejada:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-15T10:00:00Z"
 *               legenda:
 *                 type: string
 *               autorId:
 *                 type: string
 *                 description: ID do utilizador criador
 *     responses:
 *       201:
 *         description: Publicação criada com sucesso
 */
router.get('/', publicacaoController.listar);
router.post('/', publicacaoController.criar);

module.exports = router;