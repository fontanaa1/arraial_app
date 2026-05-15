const express = require('express')

const router = express.Router()

const supabase = require('../data/supabase')

// =====================================
// COMPRAR INGRESSO
// =====================================

router.post('/', async (req, res) => {

    const {
        usuario_id,
        show_id,
        quantidade,
        total
    } = req.body

    const { data, error } = await supabase
        .from('ingressos')
        .insert({
            usuario_id,
            show_id,
            quantidade,
            total
        })

    if(error){

        return res.status(500).json(error)
    }

    res.json({
        sucesso: true,
        data
    })
})

// =====================================
// LISTAR INGRESSOS
// =====================================

router.get('/:usuario_id', async (req, res) => {

    const { usuario_id } = req.params

    const { data, error } = await supabase
        .from('ingressos')
        .select(`
            *,
            shows (*)
        `)
        .eq('usuario_id', usuario_id)

    if(error){

        return res.status(500).json(error)
    }

    res.json(data)
})

module.exports = router