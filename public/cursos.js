let cursos = []
let cursoAtual = null

function renderCursos() {
    const tbody = document.querySelector('#cursosTable tbody')
    tbody.innerHTML = ''

    cursos.forEach(function (curso, index) {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${curso.nome}</td>
            <td>${curso.sigla}</td>
            <td>${curso.descricao}</td>
            <td>${curso.coordenador}</td>
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
    document.getElementById('coordenador').value = curso.coordenador
    openModal('cursoModal')
}

function deleteCurso(index) {
    cursos.splice(index, 1)
    renderCursos()
}

document.addEventListener('DOMContentLoaded', function() {
    const addCurso = document.getElementById('addCurso')
    const cursoForm = document.getElementById('cursoForm')

    addCurso.addEventListener('click', function () {
        cursoAtual = null
        cursoForm.reset()
        openModal('cursoModal')
    })

    document.querySelectorAll('.close').forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeModal('cursoModal')
        })
    })

    cursoForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const curso = {
            id: cursoAtual === null ? Date.now() : cursos[cursoAtual].id,
            nome: document.getElementById('nomeCurso').value,
            sigla: document.getElementById('sigla').value,
            descricao: document.getElementById('descricao').value,
            coordenador: document.getElementById('coordenador').value
        }

        if (cursoAtual === null) {
            cursos.push(curso)
        } else {
            cursos[cursoAtual] = curso
        }

        renderCursos()
        closeModal('cursoModal')
    })

    fetch('/cursos')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            cursos = data
            renderCursos()
        })
})