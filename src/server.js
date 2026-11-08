require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

app.use(cors());
app.use(express.json());

// Configuração base do Swagger com o esquema de segurança (Cadeado)
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Central MKT API',
            version: '1.0.0',
            description: 'API para gestão de calendário de marketing',
        },
        servers: [
            {
                url: 'http://localhost:3333',
                description: 'Servidor Local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js', './src/server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Verifica o status do servidor
 *     responses:
 *       200:
 *         description: Servidor rodando perfeitamente
 */
app.get('/api/status', (req, res) => {
    res.json({ status: 'Central MKT API rodando perfeitamente!' });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/publicacoes', require('./routes/publicacoes.routes'));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação do Swagger disponível em http://localhost:${PORT}/api-docs`);
});