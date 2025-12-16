const express = require('express');
const router = express.Router();
const dao = require('../dao/QuestDAO');

router.get('/', async (req, res) => {
    const lista = await dao.listar();
    res.json(lista);
});

router.post('/', async (req, res) => {
    try {
        const novo = await dao.salvar(req.body);
        res.status(201).json(novo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const atualizado = await dao.atualizar(req.params.id, req.body);
    res.json(atualizado);
});

router.delete('/:id', async (req, res) => {
    await dao.excluir(req.params.id);
    res.json({ message: 'Sucesso' });
});

module.exports = router;