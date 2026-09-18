// ==========================================
// PLAYLIST DE MÚSICAS
// Estrutura de armazenamento: Array
// ==========================================

let playlist = [];

// ==========================================
// CREATE
// Adiciona uma nova música à playlist
// ==========================================

function criarMusica(titulo, artista, album, genero, ano) {

    // Verifica se a música já existe
    const musicaExistente = playlist.find(musica =>
        musica.artista.toLowerCase() === artista.toLowerCase() &&
        musica.titulo.toLowerCase() === titulo.toLowerCase()
    );

    // Impede o cadastro de músicas duplicadas
    if (musicaExistente) {
        return null;
    }

    const novaMusica = {
        titulo: titulo,
        artista: artista,
        album: album,
        genero: genero,
        ano: ano
    };

    playlist.push(novaMusica);

    return novaMusica;
}


// ==========================================
// READ
// Lista todas as músicas da playlist
// ==========================================

function listarMusicas() {
    return playlist;
}


// ==========================================
// READ
// Busca todas as músicas de um artista
// ==========================================

function buscarMusicasPorArtista(artista) {

    return playlist.filter(musica =>
        musica.artista.toLowerCase() === artista.toLowerCase()
    );
}


// ==========================================
// READ
// Busca uma música específica pelo
// artista + título
// ==========================================

function buscarMusica(artista, titulo) {

    return playlist.find(musica =>
        musica.artista.toLowerCase() === artista.toLowerCase() &&
        musica.titulo.toLowerCase() === titulo.toLowerCase()
    );
}


// ==========================================
// UPDATE
// Atualiza uma música específica
// usando artista + título para encontrá-la
// ==========================================

function atualizarMusica(
    artista,
    titulo,
    novoTitulo,
    novoArtista,
    novoAlbum,
    novoGenero,
    novoAno
) {

    const musica = playlist.find(musica =>
        musica.artista.toLowerCase() === artista.toLowerCase() &&
        musica.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (!musica) {
        return null;
    }

    musica.titulo = novoTitulo;
    musica.artista = novoArtista;
    musica.album = novoAlbum;
    musica.genero = novoGenero;
    musica.ano = novoAno;

    return musica;
}


// ==========================================
// DELETE
// Exclui uma música específica
// usando artista + título
// ==========================================

function excluirMusica(artista, titulo) {

    const indice = playlist.findIndex(musica =>
        musica.artista.toLowerCase() === artista.toLowerCase() &&
        musica.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (indice === -1) {
        return null;
    }

    const musicaExcluida = playlist.splice(indice, 1);

    return musicaExcluida[0];
}
