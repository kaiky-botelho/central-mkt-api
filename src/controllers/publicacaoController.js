const prisma = require('../prisma');

module.exports = {
    async listar(req, res) {
        try {
            const { mes, ano } = req.query;
            let filtro = {};

            if (mes && ano) {
                const dataInicio = new Date(ano, mes - 1, 1);
                const dataFim = new Date(ano, mes, 0, 23, 59, 59);
                filtro = {
                    dataPlanejada: { gte: dataInicio, lte: dataFim }
                };
            }

            const publicacoes = await prisma.publicacao.findMany({
                where: filtro,
                orderBy: { dataPlanejada: 'asc' }
            });

            res.json(publicacoes);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: 'Erro ao buscar publicações.' });
        }
    },

    async criar(req, res) {
        try {
            // Tudo com "Id" minúsculo no final
            const { titulo, canal, formato, dataPlanejada, legenda, autorId } = req.body;

            const novaPublicacao = await prisma.publicacao.create({
                data: {
                    titulo,
                    canal,
                    formato,
                    dataPlanejada: new Date(dataPlanejada),
                    legenda,
                    autorId, // Tudo com "Id" minúsculo no final
                    status: 'AGUARDANDO'
                }
            });

            res.status(201).json(novaPublicacao);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: 'Erro ao criar publicação.' });
        }
    }
};