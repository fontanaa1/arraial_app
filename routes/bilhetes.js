const express = require('express');

const router = express.Router();

const supabase = require('../data/supabase');

router.get('/', async (req, res, next) => {

    try {

        const { data, error } = await supabase
            .from('bilhetes')
            .select('*')
            .order('criado_em', {
                ascending: false
            });

        if (error) throw error;

        res.json({
            sucesso: true,
            bilhetes: data
        });

    } catch (err) {

        next(err);

    }

});


router.post('/', async (req, res, next) => {

    try {

        const {
            de_nome,
            para_nome,
            mensagem,
            anonimo
        } = req.body;


        const { data, error } = await supabase
            .from('bilhetes')
            .insert([
                {
                    de_nome,
                    para_nome,
                    mensagem,
                    anonimo
                }
            ])
            .select();


        if (error) throw error;


        res.status(201).json({
            sucesso: true,
            bilhete: data[0]
        });

    } catch (err) {

        next(err);

    }

});

module.exports = router;