const express = require('express');

const router = express.Router();

const supabase = require('../data/supabase');

router.post('/', async (req, res, next) => {

    try {

        const {
            nome,
            email,
            senha
        } = req.body;


        const { data, error } = await supabase
            .from('usuarios')
            .insert([
                {
                    nome,
                    email,
                    senha
                }
            ])
            .select();


        if (error) throw error;


        res.status(201).json({
            sucesso: true,
            usuario: data[0]
        });

    } catch (err) {

        next(err);

    }

});


router.get('/:email', async (req, res, next) => {

    try {

        const { email } = req.params;

        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (error) throw error;

        res.json({
            sucesso: true,
            usuario: data
        });

    } catch (err) {

        next(err);

    }

});

module.exports = router;