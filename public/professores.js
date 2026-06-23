let professores = []
let professorAtual = null

function renderProfessores() {
    const tbody = document.querySelector('#professoresTable tbody')
    tbody.innerHTML = ''

    professores.forEach(function (professor, index) {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${professor.nome}</td>
            <td>${professor.email}</td>
            <td>
                <button type="button" onclick="editProfessor(${index})">Editar</button>
                <button type="button" onclick="deleteProfessor(${index})">Excluir</button>
            </td>
        `
        tbody.appendChild(row)
    })
}

function openModal(id) {
    document.getElementById(id).style.display = 'block'
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none'
}

function editProfessor(index) {
    professorAtual = index
    const professor = professores[index]

    document.getElementById('codigoProfessor').value = professor.id
    document.getElementById('nomeProfessor').value = professor.nome
    document.getElementById('emailProfessor').value = professor.email
    openModal('professorModal')
}

function deleteProfessor(index) {
    const professorId = professores[index].id
    fetch('/api/professores/' + professorId, { method: 'DELETE' })
        .then(function () {
            professores.splice(index, 1)
            renderProfessores()
        })
}

document.addEventListener('DOMContentLoaded', function () {
    const addProfessor = document.getElementById('addProfessor')
    const professorForm = document.getElementById('professorForm')

    addProfessor.addEventListener('click', function () {
        professorAtual = null
        professorForm.reset()
        openModal('professorModal')
    })

    document.querySelectorAll('.close').forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeModal('professorModal')
        })
    })

    professorForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const nome = document.getElementById('nomeProfessor').value
        const email = document.getElementById('emailProfessor').value

        const professor = {
            nome: nome,
            email: email
        }

        if (professorAtual === null) {
            fetch('/api/professores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(professor)
            })
                .then(function (response) { return response.json() })
                .then(function (novoProfessor) {
                    professores.push(novoProfessor)
                    renderProfessores()
                    closeModal('professorModal')
                })
        } else {
            const professorId = professores[professorAtual].id
            fetch('/api/professores/' + professorId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(professor)
            })
                .then(function (response) { return response.json() })
                .then(function (professorBuscado) {
                    professores[professorAtual] = professorBuscado
                    renderProfessores()
                    closeModal('professorModal')
                })
        }
    })

    fetch('/api/professores')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            professores = data
            renderProfessores()
        })
})