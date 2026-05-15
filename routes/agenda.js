const express = require('express')
const router = express.Router()
const supabase = require('../data/supabase')

// =====================================
// LISTAR SHOWS
// =====================================

router.get('/', async (req, res) => {

    const { data, error } = await supabase
        .from('shows')
        .select(`
            *,
            categorias ( nome )
        `)

    if (error) {
        return res.status(500).json(error)
    }

    // Mapeia categoria para manter compatibilidade com o HTML
    const shows = data.map(s => ({
        ...s,
        categoria: s.categorias?.nome
    }))

    res.json(shows)
})

// =====================================
// SHOW POR ID
// =====================================

router.get('/:id', async (req, res) => {

    const { id } = req.params

    const { data, error } = await supabase
        .from('shows')
        .select(`
            *,
            categorias ( nome )
        `)
        .eq('id', id)
        .single()

    if (error) {
        return res.status(500).json(error)
    }

    const show = { ...data, categoria: data.categorias?.nome }

    res.json(show)
})

module.exports = router
