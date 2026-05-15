const express = require('express')

const router = express.Router()

const supabase = require('../data/supabase')

// =====================================
// LISTAR SHOWS
// =====================================

router.get('/', async (req, res) => {

    const { data, error } = await supabase
        .from('shows')
        .select('*')
        .order('data_show', {
            ascending: true
        })

    if(error){

        return res.status(500).json(error)
    }

    res.json(data)
})

// =====================================
// SHOW POR ID
// =====================================

router.get('/:id', async (req, res) => {

    const { id } = req.params

    const { data, error } = await supabase
        .from('shows')
        .select('*')
        .eq('id', id)
        .single()

    if(error){

        return res.status(500).json(error)
    }

    res.json(data)
})

module.exports = router