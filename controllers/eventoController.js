const eventoService = require('../services/evento');

async function criarEvento(req, res) {
    const dadosDoEvento = req.body;

    if (!dadosDoEvento.nome || !dadosDoEvento.latitude || !dadosDoEvento.palavra_chave) {
        return res.status(400).json({ message: 'Campos essenciais como nome, latitude e palavra_chave são obrigatórios.' });
    }

    try {
        const novoEvento = await eventoService.criarEvento(dadosDoEvento);

        return res.status(201).json(novoEvento);

    } catch (error) {
        return res.status(500).json({ message: error.message || 'Erro ao criar o evento.' });
    }
}

async function checkIn(req, res) {
    try {
        const userId = req.userId;
        const { id: eventoId } = req.params;
        const { latitude, longitude, palavra_chave } = req.body;

        if (!latitude || !longitude || !palavra_chave) {
            return res.status(400).json({ message: 'Latitude, longitude e palavra_chave são obrigatórias.' });
        }

        const resultado = await eventoService.realizarCheckIn(
            userId,
            eventoId,
            latitude,
            longitude,
            palavra_chave
        );
        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(403).json({ message: error.message || 'Ocorreu um erro ao processar o check-in.' });
    }
}

async function getEventos(req, res) {
    try {
        const eventos = await eventoService.listarEventos();
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar eventos.' });
    }
}

async function atualizarEvento(req, res) {
    const { id } = req.params;
    const dadosEvento = req.body;
    await eventoService.atualizarEvento(id, dadosEvento);
    return res.status(200).json({ message: 'Evento atualizado com sucesso.' });
}

async function deletarEvento(req, res) {
    const { id } = req.params;
    await eventoService.deletarEvento(id);
    return res.status(200).json({ message: 'Evento deletado com sucesso.' });
}

module.exports = { checkIn, getEventos, criarEvento, deletarEvento, atualizarEvento };