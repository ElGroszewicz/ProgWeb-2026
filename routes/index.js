const express = require('express')
const router = express.Router()

const professores = require('./professores')
const cursos = require('./cursos')

router.use('/professores', professores)
router.use('/cursos', cursos)

module.exports = router