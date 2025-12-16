const mongoose = require('mongoose');

const conectar = async () => {
    console.log('⏳ Iniciando tentativa de conexão com o MongoDB...');

    try {
        const connectionString = 'mongodb+srv://admin:<db_password>@cluster0.takrhvm.mongodb.net/?appName=Cluster0';

        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000
        });

        console.log('✅ MongoDB Conectado com Sucesso!');
    } catch (error) {
        console.log('❌ FALHA NA CONEXÃO!');
        console.error('Motivo do erro:', error.message); 
    }
};

module.exports = conectar;