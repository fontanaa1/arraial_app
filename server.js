const express = require('express');

const cors = require('cors');

const logger = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandler');

const rotasBarraquinhas = require('./routes/barraquinhas');
const rotasProdutos = require('./routes/produtos');
const rotasReceitas = require('./routes/receitas');
const rotasAgenda = require('./routes/agenda');
const rotasBilhetes = require('./routes/bilhetes');
const rotasUsuarios = require('./routes/usuarios');

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);


// ======================================================
// ROTA PRINCIPAL
// ======================================================

app.get('/', (req, res) => {

    res.json({
        sucesso: true,
        mensagem: '🎪 API Arraiá App funcionando!'
    });

});


// ======================================================
// ROTAS
// ======================================================

app.use('/api/barraquinhas', rotasBarraquinhas);

app.use('/api/produtos', rotasProdutos);

app.use('/api/receitas', rotasReceitas);

app.use('/api/agenda', rotasAgenda);

app.use('/api/bilhetes', rotasBilhetes);

app.use('/api/usuarios', rotasUsuarios);


// ======================================================
// 404
// ======================================================

app.use((req, res) => {

    res.status(404).json({
        sucesso: false,
        mensagem: 'Rota não encontrada'
    });

});


// ======================================================
// ERROR HANDLER
// ======================================================

app.use(errorHandler);


// ======================================================
// SERVIDOR
// ======================================================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

    console.log('');
    console.log('=================================');
    console.log('🎪 ARRAIÁ APP ONLINE');
    console.log(`🔥 http://localhost:${PORT}`);
    console.log('=================================');
    console.log('');

});