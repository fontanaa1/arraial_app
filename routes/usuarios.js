const express = require('express')
const router = express.Router()
const supabase = require('../data/supabase')

// =====================================
// CADASTRO
// =====================================

router.post('/cadastro', async (req, res) => {

    const { email, senha } = req.body

    const { data, error } = await supabase.auth.signUp({
        email,
        password: senha
    })

    if (error) return res.status(400).json({ erro: error.message })

    res.json({ mensagem: 'Cadastro realizado!', usuario: data.user })
})

// =====================================
// LOGIN
// =====================================

router.post('/login', async (req, res) => {

    const { email, senha } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha
    })

    if (error) return res.status(400).json({ erro: error.message })

    res.json({ mensagem: 'Login realizado!', session: data.session })
})

module.exports = router