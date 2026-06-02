const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname)))

app.get('/cursos', (req, res) => {
    const resposta = require('./public/cursos.json')
    res.json(resposta)
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})