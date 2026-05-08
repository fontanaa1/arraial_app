const express = require('express');

const router = express.Router();

const supabase = require('../data/supabase');

router.get('/', async (req, res, next) => {

    try {

        const { categoriaId } = req.query;

        let consulta = supabase
            .from('produtos')
            .select('*');


        if (categoriaId) {

            consulta = consulta.eq(
                'categoria_id',
                categoriaId
            );

        }


        const { data, error } = await consulta
            .order('id');


        if (error) throw error;


        res.json({
            sucesso: true,
            produtos: data
        });

    } catch (err) {

        next(err);

    }

});


router.get('/:id', async (req, res, next) => {

    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) throw error;


        if (!data) {

            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado'
            });

        }

        res.json({
            sucesso: true,
            produto: data
        });

    } catch (err) {

        next(err);

    }

});

module.exports = router;