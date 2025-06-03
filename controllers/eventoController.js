const { Evento } = require('../models');
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
        console.error("Erro no controller ao criar evento:", error);
        return res.status(500).json({ message: error.message || 'Erro ao criar o evento.' });
    }
}

async function checkIn(req, res) {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId && req.userId) {
             userId = req.userId;
        }
        if (!userId) {
             return res.status(401).json({ message: 'Usuário não autenticado corretamente.'});
        }

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
        console.error("Erro no controller ao fazer check-in:", error);
        return res.status(403).json({ message: error.message || 'Ocorreu um erro ao processar o check-in.' });
    }
}

async function getEventos(req, res) {
    try {
        const eventos = await eventoService.listarEventos();
        return res.status(200).json(eventos);
    } catch (error) {
        console.error("Erro no controller ao buscar eventos:", error);
        return res.status(500).json({ message: 'Erro ao buscar eventos.' });
    }
}

async function getEventoId(req, res) {
    try {
        const { id } = req.params;
        const evento = await eventoService.listarEventoId(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        return res.status(200).json(evento);
    } catch (error) {
        console.error("Erro no controller ao buscar evento por ID:", error);
        return res.status(500).json({ message: 'Erro ao buscar evento por ID.' });
    }
}

async function atualizarEvento(req, res) {
    try {
        const { id } = req.params;
        const dadosEvento = req.body;
        const eventoAtualizado = await eventoService.atualizarEvento(id, dadosEvento);
        if (!eventoAtualizado) {
             return res.status(404).json({ message: 'Evento não encontrado para atualização.'});
        }
        return res.status(200).json({ message: 'Evento atualizado com sucesso.', evento: eventoAtualizado });
    } catch (error) {
        console.error("Erro no controller ao atualizar evento:", error);
        return res.status(500).json({ message: error.message || 'Erro ao atualizar evento.' });
    }
}

async function deletarEvento(req, res) {
    try {
        const { id } = req.params;
        const resultado = await eventoService.deletarEvento(id);
        if (!resultado) {
             return res.status(404).json({ message: 'Evento não encontrado para deleção.'});
        }
        return res.status(200).json({ message: 'Evento deletado com sucesso.' });
    } catch (error) {
        console.error("Erro no controller ao deletar evento:", error);
        return res.status(500).json({ message: error.message || 'Erro ao deletar evento.' });
    }
}

module.exports = { checkIn, getEventos, getEventoId, criarEvento, deletarEvento, atualizarEvento };