document.addEventListener("DOMContentLoaded", () => {
    const sobre = document.querySelector("footer")

    fetch('public/sobre.json')
        .then(response => response.json())
        .then(dados => {
            sobre.innerHTML = `
                <p>Desenvolvido por ${dados.autor}, em ${dados.data}.</p>
                <p>Contatos: ${dados.contatos[0]}</p>
            `
        })
})