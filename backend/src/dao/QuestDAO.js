const Quest = require('../models/Quest');

class QuestDAO {
    async listar() {
        return await Quest.find().populate('turma');
    }

    async buscarPorId(id) {
        return await Quest.findById(id).populate('turma');
    }

    async salvar(dados) {
        const nova = new Quest(dados);
        return await nova.save();
    }

    async atualizar(id, dados) {
        return await Quest.findByIdAndUpdate(id, dados, { new: true });
    }

    async excluir(id) {
        return await Quest.findByIdAndDelete(id);
    }
}

module.exports = new QuestDAO();