const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    xpReward: { type: Number, default: 100 },
    dataLimite: { type: Date },
    dificuldade: { type: String, default: 'Normal' },

    // RELACIONAMENTO: Uma quest pertence a uma Turma
    turma: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Turma',
        required: true 
    }
});

module.exports = mongoose.model('Quest', questSchema);