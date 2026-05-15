// =====================================
// API URL
// =====================================
const API_URL = 'https://arraial-app.vercel.app/api'

// =====================================
// ESTADO GLOBAL
// =====================================
let todosShows = []
let categoriaAtiva = ''
let carrinho = []
let carrinhoComidas = []
let usuarioLogado = null
let filaBeijo = []
let ultimoNumeroFila = 0
let comidaFiltroAtivo = 'todas'

// =====================================
// CARDÁPIO PROFISSIONAL
// =====================================
const cardapio = [
    {
        id: 1,
        nome: 'Pamonha Cremosa',
        preco: 12.00,
        categoria: 'salgadas',
        imagem: 'https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?w=400',
        desc: 'Pamonha artesanal com queijo canastra e manteiga da roça',
        estrelas: 5,
        vegano: false,
        promocao: false,
        destaque: true
    },
    {
        id: 2,
        nome: 'Curau Especial',
        preco: 10.00,
        categoria: 'doces',
        imagem: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
        desc: 'Curau de milho verde cremoso com canela e cravo',
        estrelas: 4,
        vegano: true,
        promocao: false,
        destaque: false
    },
    {
        id: 3,
        nome: 'Quentão da Casa',
        preco: 8.00,
        categoria: 'bebidas',
        imagem: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400',
        desc: 'Quentão com gengibre, canela, cravo e um toque de mel',
        estrelas: 5,
        vegano: true,
        promocao: true,
        destaque: true
    },
    {
        id: 4,
        nome: 'Caldo Verde',
        preco: 14.00,
        categoria: 'salgadas',
        imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
        desc: 'Caldo verde com calabresa defumada e couve fresca',
        estrelas: 5,
        vegano: false,
        promocao: false,
        destaque: true
    },
    {
        id: 5,
        nome: 'Canjica Doce',
        preco: 10.00,
        categoria: 'doces',
        imagem: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
        desc: 'Canjica branca com leite condensado, coco e amendoim',
        estrelas: 4,
        vegano: false,
        promocao: false,
        destaque: false
    },
    {
        id: 6,
        nome: 'Bolo de Milho',
        preco: 9.00,
        categoria: 'doces',
        imagem: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400',
        desc: 'Bolo de milho caseiro com erva-doce e goiabada',
        estrelas: 5,
        vegano: false,
        promocao: true,
        destaque: true
    },
    {
        id: 7,
        nome: 'Cachorro-Quente',
        preco: 15.00,
        categoria: 'salgadas',
        imagem: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400',
        desc: 'Hot dog com molho especial, batata palha e queijo',
        estrelas: 4,
        vegano: false,
        promocao: false,
        destaque: false
    },
    {
        id: 8,
        nome: 'Suco de Milho',
        preco: 7.00,
        categoria: 'bebidas',
        imagem: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
        desc: 'Suco de milho verde batido com leite e gelo',
        estrelas: 4,
        vegano: true,
        promocao: false,
        destaque: false
    },
    {
        id: 9,
        nome: 'Espetinho Misto',
        preco: 16.00,
        categoria: 'salgadas',
        imagem: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
        desc: 'Espetinho de carne, frango e linguiça com farofa',
        estrelas: 5,
        vegano: false,
        promocao: false,
        destaque: true
    },
    {
        id: 10,
        nome: 'Pé de Moleque',
        preco: 6.00,
        categoria: 'doces',
        imagem: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
        desc: 'Pé de moleque crocante com amendoim e rapadura',
        estrelas: 4,
        vegano: true,
        promocao: false,
        destaque: false
    },
    {
        id: 11,
        nome: 'Chocolate Quente',
        preco: 9.00,
        categoria: 'bebidas',
        imagem: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f701?w=400',
        desc: 'Chocolate quente cremoso com chantilly e canela',
        estrelas: 5,
        vegano: false,
        promocao: false,
        destaque: true
    },
    {
        id: 12,
        nome: 'Pastel de Milho',
        preco: 11.00,
        categoria: 'salgadas',
        imagem: 'https://images.unsplash.com/photo-1639755990777-2dd1f9b3e8de?w=400',
        desc: 'Pastel crocante recheado com milho verde e catupiry',
        estrelas: 4,
        vegano: false,
        promocao: true,
        destaque: false
    }
]

// =====================================
// CANTADAS CAIPIRAS (Banco de IA)
// =====================================
const cantadasDB = {
    caipira: [
        "Ô {nome}, cê é tão bonita que nem precisava de espantalho na roça, só sua beleza já espanta os passarinho! 🌽",
        "{nome}, se ocê fosse milho, eu ficava o dia inteiro debuiando só pra te ver sorrir! 😍",
        "Sô! {nome}, cê é mais gostosa que pamonha quentinha saindo do fogo! 🔥",
        "{nome}, meu coração pula que nem pipoca na panela quando ocê passa! 💕",
        "Uai, {nome}, cê é o doce de leite que faltava no meu pedaço de queijo! 🧀"
    ],
    engracada: [
        "{nome}, eu não sou a TIM, mas quero você pra mim! 📱😂",
        "{nome}, cê é tão linda que se beleza fosse crime, ocê tava presa na minha cela! 🚔",
        "Me chama de fogão a lenha e vem me acender, {nome}! 🔥😆",
        "{nome}, você não é pescoço, mas mexe com a minha cabeça! 🤪",
        "Seu pai é padeiro, {nome}? Porque você é um sonho! 🥖😂"
    ],
    romantica: [
        "{nome}, sob a luz da fogueira, teu olhar é mais brilhante que as estrelas do sertão! ✨",
        "No arraial da vida, {nome}, você é a quadrilha que meu coração escolheu dançar pra sempre 💃",
        "{nome}, teu sorriso ilumina mais que balão na noite de São João! 🎈",
        "Se a vida é uma festa junina, {nome}, você é a prenda mais linda desse arraial 🌹",
        "{nome}, contigo eu quero pular a fogueira do amor e nunca mais apagar essa chama 🔥"
    ],
    atacante: [
        "{nome}, se prepare que hoje eu vou ser o milho e você a pamonha, porque eu vou te enrolar todinha! 🌽🔥",
        "Ô {nome}, me fala uma coisa: tá doendo aí onde eu vou te beijar? 💋😏",
        "{nome}, na roça ou na cidade, eu dou um jeito de te encontrar... e de te beijar também! 😘",
        "Cê é o quentão mais quente que eu já provei, {nome}! 🍷🔥",
        "{nome}, essa noite a fogueira não vai ser a única coisa queimando! 🔥😈"
    ],
    fofinha: [
        "{nome}, cê é tão fofa que dá vontade de guardar num potinho de doce de abóbora! 🎃🧸",
        "Oi {nome}, meu coração derreteu que nem marshmallow na fogueira quando te viu! 🍡",
        "{nome}, ocê é o algodão doce mais colorido desse parque inteirinho! 🌈",
        "Seu abraço deve ser mais quentinho que cobertor em noite de frio na roça, {nome} 🥰",
        "{nome}, teu jeitinho caipira me fez querer casar na igrejinha da matriz! ⛪💒"
    ]
}

// =====================================
// SISTEMA DE PÁGINAS
// =====================================
function abrirPagina(pagina) {
    document.getElementById('pagina-principal').classList.add('hidden')
    if (pagina === 'correio') {
        document.getElementById('pagina-correio').classList.remove('hidden')
        document.getElementById('pagina-cardapio').classList.add('hidden')
    } else if (pagina === 'cardapio') {
        document.getElementById('pagina-cardapio').classList.remove('hidden')
        document.getElementById('pagina-correio').classList.add('hidden')
    }
    window.scrollTo(0, 0)
}

function fecharPagina() {
    document.getElementById('pagina-correio').classList.add('hidden')
    document.getElementById('pagina-cardapio').classList.add('hidden')
    document.getElementById('pagina-principal').classList.remove('hidden')
    window.scrollTo(0, 0)
}

// =====================================
// TOAST
// =====================================
function mostrarToast(msg = '🎟️ Ingresso adicionado!') {
    const t = document.getElementById('toast')
    t.textContent = msg
    t.classList.remove('opacity-0', 'translate-y-4')
    t.classList.add('opacity-100', 'translate-y-0')
    setTimeout(() => {
        t.classList.add('opacity-0', 'translate-y-4')
        t.classList.remove('opacity-100', 'translate-y-0')
    }, 2500)
}

// =====================================
// CANTADAS
// =====================================
function gerarCantada() {
    const nome = document.getElementById('correio-para').value.trim() || 'crush'
    const estilo = document.getElementById('correio-estilo').value
    const cantadas = cantadasDB[estilo]
    const cantada = cantadas[Math.floor(Math.random() * cantadas.length)].replace('{nome}', nome)

    document.getElementById('cantada-resultado').classList.remove('hidden')
    document.getElementById('cantada-texto').textContent = cantada

    const historico = document.getElementById('historico-cantadas')
    const item = document.createElement('div')
    item.className = 'chat-message bg-white/5 rounded-lg p-3 text-xs text-white/70'
    item.innerHTML = `<span class="text-pink/70 font-bold">Para ${nome}:</span> "${cantada}"`
    historico.insertBefore(item, historico.firstChild)

    criarCoracoesFlutuantes()
}

function enviarCantada() {
    const cantada = document.getElementById('cantada-texto').textContent
    if (cantada) {
        mostrarToast('💌 Cantada enviada com sucesso!')
        criarCoracoesFlutuantes()
    }
}

function criarCoracoesFlutuantes() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div')
            heart.className = 'floating-heart text-2xl'
            heart.textContent = ['💕', '❤️', '💖', '💘', '💝', '🌹', '💗', '✨'][i]
            heart.style.left = Math.random() * 80 + 10 + '%'
            heart.style.top = Math.random() * 40 + 50 + '%'
            document.body.appendChild(heart)
            setTimeout(() => heart.remove(), 1500)
        }, i * 100)
    }
}

// =====================================
// BARRACA DO BEIJO
// =====================================
function enviarMensagemBeijo() {
    const input = document.getElementById('chat-input')
    const msg = input.value.trim()
    if (!msg) return

    const chat = document.getElementById('chat-beijo')

    const userMsg = document.createElement('div')
    userMsg.className = 'chat-message flex justify-end'
    userMsg.innerHTML = `<div class="bg-pink/20 rounded-xl px-4 py-2 max-w-[80%] text-sm text-white/90">${msg}</div>`
    chat.appendChild(userMsg)

    input.value = ''
    chat.scrollTop = chat.scrollHeight

    setTimeout(() => {
        const respostas = [
            '💋 Oiê! Já já alguém te atende, viu?',
            '🌹 Que amor! Quer agendar um horário?',
            '💕 Aqui na barraca do beijo, o amor está no ar!',
            '😘 Tem vaga na fila virtual! Quer garantir seu beijo?',
            '💝 Anotado! Vou separar um beijo bem especial pra você!'
        ]
        const resposta = respostas[Math.floor(Math.random() * respostas.length)]
        const botMsg = document.createElement('div')
        botMsg.className = 'chat-message flex justify-start'
        botMsg.innerHTML = `<div class="bg-white/10 rounded-xl px-4 py-2 max-w-[80%] text-sm text-white/80">${resposta}</div>`
        chat.appendChild(botMsg)
        chat.scrollTop = chat.scrollHeight
    }, 800)
}

function agendarBeijo() {
    ultimoNumeroFila++
    const nome = usuarioLogado?.nome || 'Visitante'
    const senha = ultimoNumeroFila
    filaBeijo.push({ nome, senha, horario: new Date().toLocaleTimeString() })

    document.getElementById('fila-posicao').textContent = filaBeijo.length
    document.getElementById('fila-tempo').textContent = Math.max(1, filaBeijo.length * 3)

    const chat = document.getElementById('chat-beijo')
    const msg = document.createElement('div')
    msg.className = 'chat-message text-center'
    msg.innerHTML = `<span class="text-pink/80 text-xs font-bold">💋 Agendado! Senha #${senha} • Aguarde ${filaBeijo.length} pessoa(s)</span>`
    chat.appendChild(msg)
    chat.scrollTop = chat.scrollHeight

    mostrarToast(`💋 Agendado! Sua senha é #${senha}`)
}

// =====================================
// CARDÁPIO
// =====================================
function renderizarCategoriasCardapio() {
    const container = document.getElementById('categorias-cardapio')
    const categorias = [
        { id: 'todas', nome: '🍽️ Todos os Sabores', count: cardapio.length },
        { id: 'salgadas', nome: '🥟 Salgados', count: cardapio.filter(c => c.categoria === 'salgadas').length },
        { id: 'doces', nome: '🍰 Doces', count: cardapio.filter(c => c.categoria === 'doces').length },
        { id: 'bebidas', nome: '🥤 Bebidas', count: cardapio.filter(c => c.categoria === 'bebidas').length },
        { id: 'destaques', nome: '⭐ Destaques', count: cardapio.filter(c => c.destaque).length },
        { id: 'promocoes', nome: '🔥 Promoções', count: cardapio.filter(c => c.promocao).length }
    ]

    container.innerHTML = categorias.map(cat => `
        <button onclick="filtrarCardapio('${cat.id}')" data-cardapio-cat="${cat.id}"
            class="cardapio-cat-btn ${cat.id === 'todas' ? 'active bg-green text-white' : 'bg-white/5 border border-white/10 text-white/70'} px-5 py-2.5 rounded-xl text-sm">
            ${cat.nome} <span class="cat-count">${cat.count}</span>
        </button>
    `).join('')
}

function filtrarCardapio(cat) {
    comidaFiltroAtivo = cat

    document.querySelectorAll('[data-cardapio-cat]').forEach(b => {
        const isActive = b.dataset.cardapioCat === cat
        b.classList.toggle('active', isActive)
        b.classList.toggle('bg-green', isActive)
        b.classList.toggle('text-white', isActive)
        b.classList.toggle('bg-white/5', !isActive)
        b.classList.toggle('border', !isActive)
        b.classList.toggle('border-white/10', !isActive)
        b.classList.toggle('text-white/70', !isActive)
    })

    renderizarCardapio()
}

function renderizarCardapio() {
    const grid = document.getElementById('grid-cardapio')
    let comidas = cardapio

    if (comidaFiltroAtivo === 'destaques') {
        comidas = cardapio.filter(c => c.destaque)
    } else if (comidaFiltroAtivo === 'promocoes') {
        comidas = cardapio.filter(c => c.promocao)
    } else if (comidaFiltroAtivo !== 'todas') {
        comidas = cardapio.filter(c => c.categoria === comidaFiltroAtivo)
    }

    if (comidas.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="text-6xl mb-4">🍽️</div>
                <p class="text-white/40 text-lg">Nenhum item encontrado nessa categoria.</p>
            </div>
        `
        return
    }

    grid.innerHTML = comidas.map(c => `
        <div class="cardapio-card">
            <div class="cardapio-img-container">
                <img src="${c.imagem}" alt="${c.nome}"
                    onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #1a0040, #2d0060)'; this.parentElement.innerHTML += '<div class=\\'flex items-center justify-center h-full text-6xl\\'>🍴</div>'">
                <div class="cardapio-overlay"></div>
                ${c.promocao ? '<div class="cardapio-badge-promo">-20%</div>' : ''}
                ${c.vegano ? '<div class="cardapio-badge-vegano">🌱 Vegano</div>' : ''}
            </div>
            <div class="cardapio-info">
                <h3 class="cardapio-nome">${c.nome}</h3>
                <p class="cardapio-desc">${c.desc}</p>
                <div class="cardapio-estrelas">
                    ${'⭐'.repeat(c.estrelas)}
                    <span class="text-white/30 text-xs ml-1">(${c.estrelas}.0)</span>
                </div>
                <div class="cardapio-footer">
                    <span class="cardapio-preco">R$ ${c.preco.toFixed(2)}</span>
                    <button onclick="adicionarComida(${c.id})" class="cardapio-btn-add">
                        + Adicionar
                    </button>
                </div>
            </div>
        </div>
    `).join('')
}

function adicionarComida(id) {
    const comida = cardapio.find(c => c.id === id)
    if (!comida) return

    const existente = carrinhoComidas.find(c => c.id === id)
    if (existente) {
        existente.qtd++
    } else {
        carrinhoComidas.push({ ...comida, qtd: 1 })
    }
    atualizarCarrinhoComidas()
    mostrarToast(`🍴 ${comida.nome} adicionado ao pedido!`)
}

function removerComida(index) {
    if (carrinhoComidas[index].qtd > 1) {
        carrinhoComidas[index].qtd--
    } else {
        carrinhoComidas.splice(index, 1)
    }
    atualizarCarrinhoComidas()
}

function atualizarCarrinhoComidas() {
    const container = document.getElementById('carrinho-comidas-itens')
    const vazio = document.getElementById('carrinho-comidas-vazio')
    const totalEl = document.getElementById('total-comidas')
    const countEl = document.getElementById('comidas-count')

    let totalQtd = 0
    let totalValor = 0

    container.innerHTML = carrinhoComidas.map((c, i) => {
        totalQtd += c.qtd
        totalValor += c.preco * c.qtd
        return `
            <div class="flex justify-between items-center bg-white/5 rounded-xl p-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg">
                        ${c.vegano ? '🌱' : '🍴'}
                    </div>
                    <div>
                        <p class="font-bold text-white text-sm">${c.nome}
                            <span class="text-white/40 font-normal">x${c.qtd}</span>
                        </p>
                        <p class="text-green text-xs font-bold">R$ ${(c.preco * c.qtd).toFixed(2)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    ${c.qtd > 1 ? `<button onclick="removerComida(${i})" class="text-white/40 hover:text-white text-xs transition">−</button>` : ''}
                    <button onclick="removerComida(${i})" class="text-red-400 hover:text-red-300 text-xs font-bold transition">
                        ✕
                    </button>
                </div>
            </div>
        `
    }).join('')

    countEl.textContent = `${totalQtd} item(ns)`
    totalEl.textContent = `R$ ${totalValor.toFixed(2)}`

    if (carrinhoComidas.length === 0) {
        vazio.classList.remove('hidden')
        container.innerHTML = ''
    } else {
        vazio.classList.add('hidden')
    }
}

function finalizarPedidoComida() {
    if (carrinhoComidas.length === 0) {
        mostrarToast('🍽️ Adicione itens ao pedido!')
        return
    }
    mostrarToast('🛍️ Pedido realizado com sucesso! Bom apetite! 🌽')
    carrinhoComidas = []
    atualizarCarrinhoComidas()
}

// =====================================
// SPLASH / LOGIN / CADASTRO
// =====================================
function pularSplash() {
    document.getElementById('splash-screen').classList.add('hidden')
}

function mostrarLogin() {
    document.getElementById('modal-login').classList.replace('hidden', 'flex')
}

function fecharLogin() {
    document.getElementById('modal-login').classList.replace('flex', 'hidden')
}

function mostrarCadastro() {
    document.getElementById('modal-cadastro').classList.replace('hidden', 'flex')
}

function fecharCadastro() {
    document.getElementById('modal-cadastro').classList.replace('flex', 'hidden')
}

function fazerLogin(e) {
    e.preventDefault()
    const email = document.getElementById('login-email').value
    const nome = email.split('@')[0]
    usuarioLogado = { nome, email }
    fecharLogin()
    pularSplash()
    mostrarToast(`🎪 Bem-vindo, ${nome}!`)
}

function fazerCadastro(e) {
    e.preventDefault()
    const nome = document.getElementById('cadastro-nome').value
    const email = document.getElementById('cadastro-email').value
    usuarioLogado = { nome, email }
    fecharCadastro()
    pularSplash()
    mostrarToast(`✨ Conta criada! Bem-vindo, ${nome}!`)
}

// =====================================
// FOGUEIRA QUE SEGUE O MOUSE
// =====================================
const fogueira = document.getElementById('fogueira-mouse')
let mouseX = 0, mouseY = 0
let fogueiraX = 0, fogueiraY = 0

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

function animarFogueira() {
    fogueiraX += (mouseX - fogueiraX) * 0.1
    fogueiraY += (mouseY - fogueiraY) * 0.1

    fogueira.style.left = fogueiraX + 'px'
    fogueira.style.top = (fogueiraY - 35) + 'px'

    requestAnimationFrame(animarFogueira)
}

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    fogueira.style.display = 'none'
} else {
    fogueira.style.display = 'block'
    animarFogueira()
}

document.addEventListener('mouseleave', () => {
    fogueira.style.opacity = '0'
})

document.addEventListener('mouseenter', () => {
    fogueira.style.opacity = '1'
})

// =====================================
// CARREGAR SHOWS
// =====================================
const categoriasDisponiveis = ['Forró', 'Funk', 'Piseiro', 'Pagode', 'Sertanejo', 'Trap']
const emojisCategorias = {
    'Forró': '🪗',
    'Funk': '🎙️',
    'Piseiro': '🎵',
    'Pagode': '🥁',
    'Sertanejo': '🤠',
    'Trap': '💎'
}

function renderizarCategorias() {
    const container = document.getElementById('categorias-container')

    let html = `
        <button onclick="filtrarCategoria('')" data-cat=""
            class="cat-btn active bg-secondary text-white px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap">
            Todos
        </button>
    `

    categoriasDisponiveis.forEach(cat => {
        html += `
            <button onclick="filtrarCategoria('${cat}')" data-cat="${cat}"
                class="cat-btn bg-white/8 border border-white/10 text-white/80 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap">
                ${emojisCategorias[cat]} ${cat}
            </button>
        `
    })

    container.innerHTML = html
}

async function carregarShows() {
    document.getElementById('loading-shows').classList.remove('hidden')
    document.getElementById('lista-shows').classList.add('hidden')
    document.getElementById('error-shows').classList.add('hidden')

    try {
        const res = await fetch(`${API_URL}/agenda`)
        if (!res.ok) throw new Error('Erro ' + res.status)
        todosShows = await res.json()
        document.getElementById('loading-shows').classList.add('hidden')
        document.getElementById('lista-shows').classList.remove('hidden')
        renderizarShows(todosShows)
    } catch (err) {
        console.error(err)
        document.getElementById('loading-shows').classList.add('hidden')
        document.getElementById('error-shows').classList.remove('hidden')
    }
}

function filtrarCategoria(cat) {
    categoriaAtiva = cat

    document.querySelectorAll('.cat-btn').forEach(b => {
        const isActive = b.dataset.cat === cat
        b.classList.toggle('active', isActive)
        b.classList.toggle('bg-secondary', isActive)
        b.classList.toggle('text-white', isActive)
        b.classList.toggle('bg-white/8', !isActive)
        b.classList.toggle('border', !isActive)
        b.classList.toggle('border-white/10', !isActive)
        b.classList.toggle('text-white/80', !isActive)
    })

    const filtrados = cat ? todosShows.filter(s => s.categoria === cat) : todosShows
    renderizarShows(filtrados)
}

function renderizarShows(shows) {
    const lista = document.getElementById('lista-shows')
    const count = document.getElementById('shows-count')
    lista.innerHTML = ''
    count.textContent = `${shows.length} show${shows.length !== 1 ? 's' : ''} encontrado${shows.length !== 1 ? 's' : ''}`

    if (shows.length === 0) {
        lista.innerHTML = `
            <div class="col-span-3 text-center py-20">
                <div class="text-5xl mb-3">🎭</div>
                <p class="text-white/40 font-semibold">Nenhum show nessa categoria.</p>
            </div>
        `
        return
    }

    shows.forEach(show => {
        const card = document.createElement('div')
        card.className = 'show-card rounded-2xl overflow-hidden cursor-pointer'
        card.onclick = () => abrirModal(show)
        card.innerHTML = `
            <div class="overflow-hidden h-56">
                <img src="${show.imagem}" alt="${show.nome}"
                    class="w-full h-full object-cover"
                    onerror="this.src='https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800'">
            </div>
            <div class="p-5">
                <div class="flex items-start justify-between gap-2 mb-3">
                    <h3 class="font-display text-3xl text-white tracking-wide leading-none">${show.nome}</h3>
                    <span class="badge text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">${show.categoria}</span>
                </div>
                <p class="text-white/40 text-sm leading-relaxed line-clamp-2">${show.descricao || ''}</p>
                <div class="mt-4 space-y-1.5">
                    <p class="text-xs font-semibold text-white/60">📍 ${show.local_show || '—'}</p>
                    <p class="text-xs text-white/40">🗓️ ${show.data_show || '—'} &nbsp; ⏰ ${show.horario || '—'}</p>
                </div>
                <div class="flex justify-between items-center mt-5 pt-4 border-t border-white/6">
                    <span class="font-display text-3xl text-secondary tracking-wide">R$ ${Number(show.preco).toFixed(2)}</span>
                    <button onclick="event.stopPropagation(); abrirModal(${JSON.stringify(show).replace(/"/g, '&quot;')})"
                        class="btn-glow text-white px-5 py-2.5 rounded-xl font-bold text-sm">
                        Comprar
                    </button>
                </div>
            </div>
        `
        lista.appendChild(card)
    })
}

function abrirModal(show) {
    document.getElementById('modal-show').classList.replace('hidden', 'flex')
    document.getElementById('modal-img').src = show.imagem
    document.getElementById('modal-nome').textContent = show.nome
    document.getElementById('modal-categoria-badge').textContent = show.categoria
    document.getElementById('modal-descricao').textContent = show.descricao || ''
    document.getElementById('modal-local').textContent = show.local_show || '—'
    document.getElementById('modal-data').textContent = show.data_show || '—'
    document.getElementById('modal-horario').textContent = show.horario || '—'
    document.getElementById('modal-preco').textContent = `R$ ${Number(show.preco).toFixed(2)}`
    document.getElementById('btn-comprar').onclick = () => adicionarCarrinho(show)
}

function fecharModal() {
    document.getElementById('modal-show').classList.replace('flex', 'hidden')
}

function adicionarCarrinho(show) {
    carrinho.push(show)
    atualizarCarrinho()
    fecharModal()
    mostrarToast('🎟️ Ingresso adicionado ao carrinho!')
}

function atualizarCarrinho() {
    const container = document.getElementById('carrinho-itens')
    const vazio = document.getElementById('carrinho-vazio')
    const countEl = document.getElementById('cart-count')

    container.innerHTML = ''

    if (carrinho.length === 0) {
        vazio.classList.remove('hidden')
        countEl.style.display = 'none'
    } else {
        vazio.classList.add('hidden')
        countEl.style.display = 'flex'
        countEl.textContent = carrinho.length
    }

    let total = 0
    carrinho.forEach((item, i) => {
        total += Number(item.preco)
        container.innerHTML += `
            <div class="flex justify-between items-center bg-white/5 rounded-xl p-4">
                <div>
                    <h3 class="font-bold text-white">${item.nome}</h3>
                    <p class="text-white/40 text-xs mt-0.5">${item.data_show || ''} · ${item.local_show || ''}</p>
                </div>
                <div class="text-right ml-4">
                    <p class="font-display text-xl text-secondary">R$ ${Number(item.preco).toFixed(2)}</p>
                    <button onclick="removerItem(${i})" class="text-xs text-red-400 hover:text-red-300 mt-1 transition">Remover</button>
                </div>
            </div>
        `
    })

    document.getElementById('total-carrinho').textContent = `R$ ${total.toFixed(2)}`
}

function removerItem(index) {
    carrinho.splice(index, 1)
    atualizarCarrinho()
}

function abrirCarrinho() {
    document.getElementById('modal-carrinho').classList.replace('hidden', 'flex')
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').classList.replace('flex', 'hidden')
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarToast('🛒 Carrinho vazio!')
        return
    }
    mostrarToast('🎉 Compra realizada com sucesso!')
    carrinho = []
    atualizarCarrinho()
    fecharCarrinho()
}

// =====================================
// INICIAR
// =====================================
renderizarCategorias()
renderizarCategoriasCardapio()
renderizarCardapio()
carregarShows()