const express = require('express');
const cors = require('cors');
const conectar = require('./src/database/conectar');


const rotaProfessores = require('./src/routes/professores');
const rotaTurmas = require('./src/routes/turmas');
const rotaQuests = require('./src/routes/quests');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

conectar();


app.use('/professores', rotaProfessores);
app.use('/turmas', rotaTurmas);
app.use('/quests', rotaQuests);


app.listen(PORT, () => {
    console.log(`📡 Servidor rodando na porta ${PORT}`);
});


module.exports = app;