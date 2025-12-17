const express = require('express');
const router = express.Router();
const dao = require('../dao/TurmaDAO');
const Turma = require('../models/Turma');
const Quest = require('../models/Quest');

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
    try {
        const id = req.params.id;
        await Quest.deleteMany({ turma: id });
        await Turma.findByIdAndDelete(id);

        res.json({ message: 'Turma e suas missões excluídas!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;