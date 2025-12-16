const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    especialidade: { type: String, required: true },
    nivel: { type: String, default: 'Iniciante' }
});

module.exports = mongoose.model('Professor', professorSchema);