// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const formulario = document.getElementById("form-musica");

const campoBusca = document.getElementById("campo-busca");

const botaoBuscar = document.getElementById("btn-buscar");

const botaoListar = document.getElementById("btn-listar");

const listaMusicas = document.getElementById("lista-musicas");

// ==========================================
// CONTROLE DE EDIÇÃO
// ==========================================

let musicaEmEdicao = null;

// ==========================================
// FUNÇÃO PARA MOSTRAR AS MÚSICAS
// ==========================================

function mostrarMusicas(musicas) {

    // Limpa a lista
    listaMusicas.innerHTML = "";

    // Verifica se não existem músicas
    if (musicas.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.classList.add("mensagem");

        mensagem.textContent =
            "Nenhuma música encontrada.";

        listaMusicas.appendChild(mensagem);

        return;
    }

    // Cria um cartão para cada música
    musicas.forEach(function(musica) {

        // ==========================================
        // CARTÃO DA MÚSICA
        // ==========================================

        const card =
            document.createElement("div");

        card.classList.add("musica");

        // ==========================================
        // INFORMAÇÕES DA MÚSICA
        // ==========================================

        const informacoes =
            document.createElement("div");

        informacoes.classList.add(
            "informacoes-musica"
        );

        // TÍTULO
        const titulo =
            document.createElement("h3");

        titulo.textContent =
            musica.titulo;

        // ARTISTA
        const artista =
            document.createElement("p");

        artista.textContent =
            "🎤 " + musica.artista;

        // ÁLBUM
        const album =
            document.createElement("p");

        album.textContent =
            "💿 " + musica.album;

        // GÊNERO
        const genero =
            document.createElement("p");

        genero.textContent =
            "🎵 " + musica.genero;

        // ANO
        const ano =
            document.createElement("p");

        ano.textContent =
            "📅 " + musica.ano;

        // Adiciona as informações ao bloco
        informacoes.appendChild(titulo);
        informacoes.appendChild(artista);
        informacoes.appendChild(album);
        informacoes.appendChild(genero);
        informacoes.appendChild(ano);

        // ==========================================
        // BOTÕES
        // ==========================================

        const acoes =
            document.createElement("div");

        acoes.classList.add("acoes");

        // BOTÃO EDITAR
        const botaoEditar =
            document.createElement("button");

        botaoEditar.type = "button";

        botaoEditar.classList.add(
            "btn-editar"
        );

        botaoEditar.textContent =
            "Editar";

        // Quando clicar em editar
        botaoEditar.addEventListener(
            "click",
            function() {

                editarMusica(
                    musica.artista,
                    musica.titulo
                );

            }
        );

        // BOTÃO EXCLUIR
        const botaoExcluir =
            document.createElement("button");

        botaoExcluir.type = "button";

        botaoExcluir.classList.add(
            "btn-excluir"
        );

        botaoExcluir.textContent =
            "Excluir";

        // Quando clicar em excluir
        botaoExcluir.addEventListener(
            "click",
            function() {

                deletarMusica(
                    musica.artista,
                    musica.titulo
                );

            }
        );

        // Adiciona os botões
        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoExcluir);

        // ==========================================
        // MONTA O CARTÃO
        // ==========================================

        card.appendChild(informacoes);
        card.appendChild(acoes);

        // Adiciona o cartão à lista
        listaMusicas.appendChild(card);

    });

}

// ==========================================
// READ
// MOSTRAR TODAS AS MÚSICAS
// ==========================================

function carregarPlaylist() {

    const musicas =
        listarMusicas();

    mostrarMusicas(musicas);

}

// ==========================================
// CREATE / UPDATE
// CADASTRAR OU EDITAR
// ==========================================

formulario.addEventListener(
    "submit",
    function(event) {

        // Impede o recarregamento
        event.preventDefault();

        // Pega os valores
        const titulo =
            document.getElementById("titulo")
                .value.trim();

        const artista =
            document.getElementById("artista")
                .value.trim();

        const album =
            document.getElementById("album")
                .value.trim();

        const genero =
            document.getElementById("genero")
                .value.trim();

        const ano =
            document.getElementById("ano")
                .value;

        // ==========================================
        // MODO EDIÇÃO
        // ==========================================

        if (musicaEmEdicao !== null) {

            const musicaAtualizada =
                atualizarMusica(

                    musicaEmEdicao.artista,

                    musicaEmEdicao.titulo,

                    titulo,

                    artista,

                    album,

                    genero,

                    Number(ano)

                );

            // Verifica se atualizou
            if (musicaAtualizada === null) {

                alert(
                    "Não foi possível atualizar a música."
                );

                return;
            }

            alert(
                "Música atualizada com sucesso!"
            );

            // Sai do modo edição
            cancelarEdicao();

            // Atualiza a lista
            carregarPlaylist();

            return;
        }

        // ==========================================
        // MODO CADASTRO
        // ==========================================

        const novaMusica =
            criarMusica(
                titulo,
                artista,
                album,
                genero,
                Number(ano)
            );

        // Verifica duplicidade
        if (novaMusica === null) {

            alert(
                "Essa música já está cadastrada para esse artista!"
            );

            return;
        }

        alert(
            "Música adicionada com sucesso!"
        );

        // Limpa o formulário
        formulario.reset();

        // Atualiza a lista
        carregarPlaylist();

    }
);

// ==========================================
// UPDATE
// EDITAR MÚSICA
// ==========================================

function editarMusica(
    artista,
    titulo
) {

    // ==========================================
    // ATIVA O VISUAL DO MODO DE EDIÇÃO
    // ==========================================

    const cardFormulario =
        formulario.closest(".card");

    cardFormulario.classList.add(
        "modo-edicao"
    );

    // Altera o título do formulário
    const tituloFormulario =
        cardFormulario.querySelector("h2");

    tituloFormulario.textContent =
        "✏️ Editando Música";

    // ==========================================
    // PROCURA A MÚSICA
    // ==========================================

    const musica =
        buscarMusica(
            artista,
            titulo
        );

    // Verifica se encontrou
    if (!musica) {

        // Remove o visual de edição
        cardFormulario.classList.remove(
            "modo-edicao"
        );

        tituloFormulario.textContent =
            "🎶 Adicionar Música";

        alert(
            "Música não encontrada."
        );

        return;
    }

    // ==========================================
    // GUARDA OS DADOS ORIGINAIS
    // ==========================================

    musicaEmEdicao = {

        artista: musica.artista,

        titulo: musica.titulo

    };

    // ==========================================
    // PREENCHE O FORMULÁRIO
    // ==========================================

    document.getElementById("titulo")
        .value = musica.titulo;

    document.getElementById("artista")
        .value = musica.artista;

    document.getElementById("album")
        .value = musica.album;

    document.getElementById("genero")
        .value = musica.genero;

    document.getElementById("ano")
        .value = musica.ano;

    // ==========================================
    // PROCURA O BOTÃO PRINCIPAL
    // ==========================================

    const botaoFormulario =
        formulario.querySelector(
            ".btn-principal"
        );

    // Muda o texto
    botaoFormulario.textContent =
        "Salvar Alterações";

    // ==========================================
    // BOTÃO CANCELAR
    // ==========================================

    if (
        !document.getElementById(
            "btn-cancelar-edicao"
        )
    ) {

        const botaoCancelar =
            document.createElement("button");

        botaoCancelar.type =
            "button";

        botaoCancelar.id =
            "btn-cancelar-edicao";

        botaoCancelar.classList.add(
            "btn-secundario"
        );

        botaoCancelar.textContent =
            "Cancelar";

        botaoCancelar.addEventListener(
            "click",
            cancelarEdicao
        );

        formulario.appendChild(
            botaoCancelar
        );

    }

    // ==========================================
    // LEVA ATÉ O FORMULÁRIO
    // ==========================================

    formulario.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}

// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

function cancelarEdicao() {

    // ==========================================
    // REMOVE O VISUAL DO MODO DE EDIÇÃO
    // ==========================================

    const cardFormulario =
        formulario.closest(".card");

    cardFormulario.classList.remove(
        "modo-edicao"
    );

    // Restaura o título original
    const tituloFormulario =
        cardFormulario.querySelector("h2");

    tituloFormulario.textContent =
        "🎶 Adicionar Música";

    // ==========================================
    // SAI DO MODO EDIÇÃO
    // ==========================================

    musicaEmEdicao = null;

    // Limpa o formulário
    formulario.reset();

    // ==========================================
    // RESTAURA O BOTÃO PRINCIPAL
    // ==========================================

    const botaoFormulario =
        formulario.querySelector(
            ".btn-principal"
        );

    botaoFormulario.textContent =
        "+ Adicionar Música";

    // ==========================================
    // REMOVE O BOTÃO CANCELAR
    // ==========================================

    const botaoCancelar =
        document.getElementById(
            "btn-cancelar-edicao"
        );

    if (botaoCancelar) {

        botaoCancelar.remove();

    }

}

// ==========================================
// DELETE
// EXCLUIR MÚSICA
// ==========================================

function deletarMusica(
    artista,
    titulo
) {

    // Procura a música
    const musica =
        buscarMusica(
            artista,
            titulo
        );

    // Verifica se encontrou
    if (!musica) {

        alert(
            "Música não encontrada."
        );

        return;
    }

    // Confirma a exclusão
    const confirmar =
        window.confirm(
            "Deseja realmente excluir " +
            "\"" +
            musica.titulo +
            "\"" +
            " de " +
            musica.artista +
            "?"
        );

    // Usuário cancelou
    if (!confirmar) {

        return;
    }

    // Executa o DELETE
    const musicaExcluida =
        excluirMusica(
            artista,
            titulo
        );

    // Verifica o resultado
    if (musicaExcluida === null) {

        alert(
            "Não foi possível excluir a música."
        );

        return;
    }

    alert(
        "Música excluída com sucesso!"
    );

    // Atualiza a lista
    carregarPlaylist();

}

// ==========================================
// READ
// BUSCAR POR ARTISTA
// ==========================================

botaoBuscar.addEventListener(
    "click",
    function() {

        const artista =
            campoBusca.value.trim();

        // Campo vazio
        if (artista === "") {

            alert(
                "Digite o nome de um artista."
            );

            return;
        }

        // Busca
        const musicas =
            buscarMusicasPorArtista(
                artista
            );

        // Mostra resultados
        mostrarMusicas(musicas);

    }
);

// ==========================================
// MOSTRAR TODAS
// ==========================================

botaoListar.addEventListener(
    "click",
    function() {

        // Limpa busca
        campoBusca.value = "";

        // Mostra tudo
        carregarPlaylist();

    }
);

// ==========================================
// CARREGAR PLAYLIST
// ==========================================

carregarPlaylist();