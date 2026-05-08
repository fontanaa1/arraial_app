const express = require('express');

const router = express.Router();

const supabase = require('../data/supabase');

router.get('/', async (req, res, next) => {

    try {

        const { data, error } = await supabase
            .from('agenda')
            .select('*')
            .order('id');

        if (error) throw error;

        res.json({
            sucesso: true,
            agenda: data
        });

    } catch (err) {

        next(err);

    }

});

module.exports = router;