
// Verificação da conexão JS (Etapa 3)
console.log("OK");

// Elementos do DOM
const formulario = document.getElementById("form-registro");
const inputNome = document.getElementById("nome");
const selectCategoria = document.getElementById("categoria");
const muralCards = document.getElementById("mural-cards");

// Vetor de objetos carregado do localStorage
let registros = JSON.parse(localStorage.getItem("meus_registros")) || [];

// Renderiza os cards na tela
function renderizarCards() {
    muralCards.innerHTML = "";

    registros.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>Card ${index + 1}: Dados Gravados</h3>
            <p><strong>Nome:</strong> ${item.nome}</p>
            <p><strong>Categoria:</strong> ${item.categoria}</p>
        `;
        muralCards.appendChild(card);
    });
}

// Captura o submit do formulário, salva no vetor e no localStorage
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const novoRegistro = {
        nome: inputNome.value.trim(),
        categoria: selectCategoria.value
    };

    if (!novoRegistro.nome || !novoRegistro.categoria) return;

    registros.push(novoRegistro);
    localStorage.setItem("meus_registros", JSON.stringify(registros));

    renderizarCards();
    formulario.reset();
    inputNome.focus();
});

// Exibe os cards salvos ao carregar ou recarregar a página (F5)
renderizarCards();

