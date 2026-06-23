let cursos = []
let professores = []
let cursoAtual = null

function populateProfessores() {
    const select = document.getElementById('coordenador')
    select.innerHTML = '<option value="">Selecione um coordenador</option>'

    professores.forEach(function (professor) {
        const option = document.createElement('option')
        option.value = professor.id
        option.textContent = professor.nome
        select.appendChild(option)
    })
}

function renderCursos() {
    const tbody = document.querySelector('#cursosTable tbody')
    tbody.innerHTML = ''

    cursos.forEach(function (curso, index) {
        const coordenador = curso.coordenador ?? curso.id_coordenador ?? ''
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${curso.nome}</td>
            <td>${curso.sigla}</td>
            <td>${curso.descricao}</td>
            <td>${coordenador}</td>
            <td>
                <button type="button" onclick="editCurso(${index})">Editar</button>
                <button type="button" onclick="deleteCurso(${index})">Excluir</button>
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

function editCurso(index) {
    cursoAtual = index
    const curso = cursos[index]

    document.getElementById('codigo').value = curso.id
    document.getElementById('nomeCurso').value = curso.nome
    document.getElementById('sigla').value = curso.sigla
    document.getElementById('descricao').value = curso.descricao
    document.getElementById('coordenador').value = curso.id_coordenador ?? ''
    openModal('cursoModal')
}

function deleteCurso(index) {
    const cursoId = cursos[index].id
    fetch('/api/cursos/' + cursoId, { method: 'DELETE' })
        .then(function () {
            cursos.splice(index, 1)
            renderCursos()
        })
}

document.addEventListener('DOMContentLoaded', function() {
    const addCurso = document.getElementById('addCurso')
    const cursoForm = document.getElementById('cursoForm')
    const coordenadorSelect = document.getElementById('coordenador')

    addCurso.addEventListener('click', function () {
        cursoAtual = null
        cursoForm.reset()
        coordenadorSelect.value = ''
        openModal('cursoModal')
    })

    document.querySelectorAll('.close').forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeModal('cursoModal')
        })
    })

    cursoForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const nome = document.getElementById('nomeCurso').value
        const sigla = document.getElementById('sigla').value
        const descricao = document.getElementById('descricao').value
        const id_coordenador = Number(document.getElementById('coordenador').value)

        const curso = {
            nome: nome,
            sigla: sigla,
            descricao: descricao,
            id_coordenador: id_coordenador
        }

        if (cursoAtual === null) {
            fetch('/api/cursos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(curso)
            })
                .then(function (response) { return response.json() })
                .then(function (novoCurso) {
                    cursos.push(novoCurso)
                    renderCursos()
                    closeModal('cursoModal')
                })
        } else {
            const cursoId = cursos[cursoAtual].id
            fetch('/api/cursos/' + cursoId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(curso)
            })
                .then(function (response) { return response.json() })
                .then(function (cursoBuscado) {
                    cursos[cursoAtual] = cursoBuscado
                    renderCursos()
                    closeModal('cursoModal')
                })
        }
    })

    fetch('/api/cursos')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            cursos = data
            renderCursos()
        })

    fetch('/api/professores')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            professores = data
            populateProfessores()
        })
})