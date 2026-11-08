const prisma = require('../prisma');

module.exports = {
    // Buscar posts (com suporte a filtro por mês/ano)
    async listar(req, res) {
        try {
            const { mes, ano } = req.query;
            let filtro = {};

            // Se o front enviar ?mes=08&ano=2026, filtramos apenas os posts daquele mês
            if (mes && ano) {
                const dataInicio = new Date(ano, mes - 1, 1);
                const dataFim = new Date(ano, mes, 0, 23, 59, 59);

                filtro = {
                    dataPlanejada: {
                        gte: dataInicio,
                        lte: dataFim
                    }
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
            const { titulo, canal, formato, dataPlanejada, legenda, autorID } = req.body;

            const novaPublicacao = await prisma.publicacao.create({
                data: {
                    titulo,
                    canal,
                    formato,
                    dataPlanejada: new Date(dataPlanejada),
                    legenda,
                    autorID,
                    status: "AGUARDANDO"
                }
            });
            res.status(201).json(novaPublicacao);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: 'Erro ao criar publicação.' });
        }
    }
};