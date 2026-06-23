const Professor = require('../models/Professor')

exports.getProfessores = async (req, res) => {
    try {
        const professores = await Professor.getAll()
        res.json(professores)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getProfessor = async (req, res) => {
    const { id } = req.params

    try {
        const professor = await Professor.getById(id)
        res.json(professor)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createProfessor = async (req, res) => {
    try {
        const professor = await Professor.insert(req.body)
        res.json(professor)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateProfessor = async (req, res) => {
    const { id } = req.params

    try {
        const professor = await Professor.update(id, req.body)
        res.json(professor)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteProfessor = async (req, res) => {
    const { id } = req.params

    try {
        const professor = await Professor.delete(id)
        res.json(professor)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}