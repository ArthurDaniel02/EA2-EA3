const express = require('express');
const router = express.Router();
const dao = require('../dao/ProfessorDAO');
const Professor = require('../models/Professor');
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
        const turmasDoProf = await Turma.find({ professor: id });
        const idsTurmas = turmasDoProf.map(t => t._id);

        if (idsTurmas.length > 0) {
            await Quest.deleteMany({ turma: { $in: idsTurmas } });
            await Turma.deleteMany({ professor: id });
        }
        await Professor.findByIdAndDelete(id);

        res.json({ message: 'Professor e todos os dados vinculados foram excluídos!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;