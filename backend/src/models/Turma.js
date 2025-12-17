const mongoose = require('mongoose');

const turmaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    semestre: { type: String, default: '2025.1' },
    descricao: { type: String },
    ativa: { type: Boolean, default: true },
    
    // RELACIONAMENTO: Uma turma pertence a um Professor
    professor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Professor',
        required: true 
    }
});

module.exports = mongoose.model('Turma', turmaSchema);