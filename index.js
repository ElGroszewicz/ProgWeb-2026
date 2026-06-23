const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const express = require('express')
const cors = require('cors')

const app = express()
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use('/api', routes)

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando em http://localhost:' + (process.env.PORT || 3000))
})