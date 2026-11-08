const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do utilizador
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@central.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido com retorno do Token JWT
 *       401:
 *         description: Credenciais inválidas
 */

router.post('/login', authController.login);

module.exports = router;