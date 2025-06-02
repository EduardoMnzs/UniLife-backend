const sequelize = require('../config/database');
const { Evento, CheckIn } = require('../models'); 
const { Op } = require('sequelize');
const pontosService = require('./pontos');

const RAIO_PERMITIDO_EM_METROS = 1000;

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function realizarCheckIn(userId, eventoId, latUsuario, lonUsuario, palavraChaveUsuario) {
    const evento = await Evento.scope('comPalavraChave').findByPk(eventoId);
    if (!evento) {
        throw new Error('Evento não encontrado.');
    }

    if (evento.palavra_chave.trim().toLowerCase() !== palavraChaveUsuario.trim().toLowerCase()) {
        throw new Error('Palavra-chave incorreta.');
    }

    const agora = new Date();
    if (agora < evento.data_inicio || agora > evento.data_fim) {
        throw new Error('Check-in fora do período do evento.');
    }

    const distancia = calcularDistancia(latUsuario, lonUsuario, evento.latitude, evento.longitude);
    if (distancia > RAIO_PERMITIDO_EM_METROS) {
        throw new Error(`Você está a ${distancia.toFixed(0)} metros do evento. Aproxime-se para fazer o check-in.`);
    }

    const checkInExistente = await CheckIn.findOne({ where: { userId, eventoId } });
    if (checkInExistente) {
        throw new Error('Você já realizou check-in neste evento.');
    }

    const t = await sequelize.transaction();
    try {
        await CheckIn.create({ userId, eventoId }, { transaction: t });

        await pontosService.concederPontos(
            userId,
            evento.pontos_oferecidos,
            `Check-in no evento: ${evento.nome}`,
            t
        );
        await t.commit();
        return { message: 'Check-in realizado e pontos concedidos com sucesso!' };
    } catch (error) {
        if (t) await t.rollback();
        throw error;
    }
}

async function criarEvento(dadosEvento) {
    return await Evento.scope(null).create(dadosEvento);
}

async function listarEventoId(id) {
    return await Evento.findByPk(id);
}

async function listarEventos() {
    return await Evento.findAll({
        where: {
            data_fim: {
                [Op.gte]: new Date()
            }
        },
        order: [
            ['data_inicio', 'ASC']
        ]
    });
}

async function atualizarEvento(id, dadosEvento) {
    return await Evento.update(dadosEvento, { where: { id } });
}

async function deletarEvento(id) {
    return await Evento.destroy({ where: { id } });
}


module.exports = { realizarCheckIn, criarEvento, listarEventoId, listarEventos, deletarEvento, atualizarEvento };