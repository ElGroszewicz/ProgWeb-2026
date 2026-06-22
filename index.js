const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(path.join(__dirname, 'img')))

app.get('/cursos', (req, res) => {
    const resposta = require('./public/cursos.json')
    res.json(resposta)
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})