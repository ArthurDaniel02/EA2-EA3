const Turma = require('../models/Turma');

class TurmaDAO {
    async listar() {

        return await Turma.find().populate('professor');
    }

    async buscarPorId(id) {
        return await Turma.findById(id).populate('professor');
    }

    async salvar(dados) {
        const nova = new Turma(dados);
        return await nova.save();
    }

    async atualizar(id, dados) {
        return await Turma.findByIdAndUpdate(id, dados, { new: true });
    }

    async excluir(id) {
        return await Turma.findByIdAndDelete(id);
    }
}

module.exports = new TurmaDAO();