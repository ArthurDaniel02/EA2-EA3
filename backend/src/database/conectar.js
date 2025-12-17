const mongoose = require('mongoose');

const conectar = async () => {
    try {

        const connectionString = 'mongodb+srv://admin:admin123@cluster0.takrhvm.mongodb.net/rpg_educacional?appName=Cluster0';
        
        await mongoose.connect(connectionString);
        console.log('✅ MongoDB Conectado com Sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar:', error);
    }
};

module.exports = conectar;