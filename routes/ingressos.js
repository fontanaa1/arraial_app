const express = require('express')
const router = express.Router()
const supabase = require('../data/supabase')

// =====================================
// COMPRAR INGRESSO
// =====================================

router.post('/', async (req, res) => {

    const { show_id, tipo, preco, token } = req.body

    // Verificar usuário pelo token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
        return res.status(401).json({ erro: 'Não autorizado. Faça login.' })
    }

    const { data, error } = await supabase
        .from('ingressos')
        .insert({
            user_id: user.id,
            show_id,
            tipo,
            preco
        })
        .select()
        .single()

    if (error) return res.status(500).json(error)

    res.json({ mensagem: 'Ingresso comprado!', ingresso: data })
})

// =====================================
// MEUS INGRESSOS
// =====================================

router.get('/meus', async (req, res) => {

    const token = req.headers.authorization?.split(' ')[1]

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
        return res.status(401).json({ erro: 'Não autorizado.' })
    }

    const { data, error } = await supabase
        .from('ingressos')
        .select(`*, shows ( nome, data_show, local_show, imagem )`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) return res.status(500).json(error)

    res.json(data)
})

module.exports = router