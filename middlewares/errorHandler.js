function errorHandler(err, req, res, next) {

    console.error(err);

    res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
    });

}

module.exports = errorHandler;