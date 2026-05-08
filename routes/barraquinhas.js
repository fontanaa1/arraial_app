const express = require('express');

const router = express.Router();

const supabase = require('../data/supabase');


// ======================================================
// GET - LISTAR CATEGORIAS + PRODUTOS
// ======================================================

router.get('/', async (req, res, next) => {

    try {

        // busca categorias
        const { data: categorias, error: erroCategorias } = await supabase
            .from('categorias')
            .select('*')
            .order('id', { ascending: true });

        if (erroCategorias) {
            throw erroCategorias;
        }


        // busca produtos
        const { data: produtos, error: erroProdutos } = await supabase
            .from('produtos')
            .select('*')
            .order('id', { ascending: true });

        if (erroProdutos) {
            throw erroProdutos;
        }


        // junta tudo
        const resultado = categorias.map(categoria => ({

            id: categoria.id,
            nome: categoria.nome,

            itens: produtos.filter(
                produto => produto.categoria_id === categoria.id
            )

        }));


        res.json({
            sucesso: true,
            barraquinhas: resultado
        });

    } catch (err) {

        next(err);

    }

});


// ======================================================
// POST - CRIAR CATEGORIA
// ======================================================

router.post('/', async (req, res, next) => {

    try {

        const { nome } = req.body;

        if (!nome) {

            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome da categoria obrigatório'
            });

        }


        const { data, error } = await supabase
            .from('categorias')
            .insert([
                { nome }
            ])
            .select();


        if (error) {
            throw error;
        }


        res.status(201).json({
            sucesso: true,
            categoria: data[0]
        });

    } catch (err) {

        next(err);

    }

});


module.exports = router;