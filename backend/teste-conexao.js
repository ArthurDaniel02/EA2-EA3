const mongoose = require('mongoose');

// String de conexão OFICIAL (com o banco 'rpg_educacional' no final)
const uri = "mongodb+srv://admin:admin123@cluster0.takrhvm.mongodb.net/rpg_educacional?retryWrites=true&w=majority&appName=Cluster0";

async function testar() {
    console.log("⏳ Tentando conectar ao MongoDB...");
    console.log("🔑 Usando usuário: admin");
    console.log("🌐 Cluster: cluster0.takrhvm.mongodb.net");

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000 // Desiste após 5 segundos
        });
        console.log("\n✅ SUCESSO! Conexão funcionando perfeitamente.");
        console.log("Pode rodar o 'npm start' que vai dar certo.");
        process.exit(0);
    } catch (error) {
        console.log("\n❌ ERRO DETALHADO:");
        console.log("---------------------------------------------------");
        console.log(error.message);
        console.log("---------------------------------------------------");
        
        if (error.message.includes('bad auth')) {
            console.log("💡 DICA: A senha ou usuário no Atlas está errada.");
            console.log("   Volte no Passo 1 e recrie a senha 'admin123'.");
        } else if (error.message.includes('buffering timed out') || error.message.includes('ETIMEOUT')) {
            console.log("💡 DICA: O Firewall bloqueou ou sua internet barrou.");
            console.log("   Volte no Passo 2 e garanta o IP 0.0.0.0/0.");
        }
        process.exit(1);
    }
}

testar();