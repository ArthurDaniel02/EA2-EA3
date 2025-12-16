const Professor = require('../models/Professor');

class ProfessorDAO {
    async listar() {
        return await Professor.find();
    }

    async buscarPorId(id) {
        return await Professor.findById(id);
    }

    async salvar(dados) {
        const novo = new Professor(dados);
        return await novo.save();
    }

    async atualizar(id, dados) {
        return await Professor.findByIdAndUpdate(id, dados, { new: true });
    }

    async excluir(id) {
        return await Professor.findByIdAndDelete(id);
    }
}

module.exports = new ProfessorDAO();