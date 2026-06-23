const Curso = require('../models/Curso')

exports.getCursos = async (req, res) => {
    try {
        const cursos = await Curso.getAll()
        res.json(cursos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getCurso = async (req, res) => {
    const { id } = req.params

    try {
        const curso = await Curso.getById(id)
        res.json(curso)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createCurso = async (req, res) => {
    try {
        const curso = await Curso.insert(req.body)
        res.json(curso)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateCurso = async (req, res) => {
    const { id } = req.params

    try {
        const curso = await Curso.update(id, req.body)
        res.json(curso)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteCurso = async (req, res) => {
    const { id } = req.params

    try {
        const curso = await Curso.delete(id)
        res.json(curso)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}