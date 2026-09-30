const btnExit = document.querySelector("#sair")
const divGames = document.querySelector("#games")
const listaFavoritos = document.querySelector("#lista-favoritos")
const listaJogando = document.querySelector("#lista-jogando")
const confirmacaoJogando = document.querySelector("#confirmacao-jogando")
const confirmarJogando = document.querySelector("#confirmar-jogando")
const cancelarJogando = document.querySelector("#cancelar-jogando")
const iptPesquisa = document.querySelector("#ipt-pesquisa")
const btnPesquisar = document.querySelector("#btn-pesquisar")

let idJogoSelecionado

btnPesquisar.addEventListener("click", () => {

    const pesquisa = iptPesquisa.value

    console.log(pesquisa)

    fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${pesquisa}`)
        .then(response => response.json())
        .then(data => {

            divGames.innerHTML = ""
            data.results.forEach(game => {
                const dataLancamento = new Date(game.released)
                const generos = game.genres.map(genero => genero.name).join(", ")
                divGames.innerHTML += `
                   <div class="card">
                      <h2>${game.name}</h2>
                      <button class="favoritar" data-id="${game.id}">♡</button>
                      <img src="${game.background_image}">
                      <p>Nota: ${game.rating}</p>
                      <p>Lançamento: ${dataLancamento.toLocaleDateString("pt-BR")}</p>
                      <p class="genero">Gênero: ${generos}</p>
                      <button class="jogando" data-id="${game.id}">Jogando</button>
                    </div>

                `
            })
             const botoesFavoritarPesquisa = document.querySelectorAll(".favoritar")

                botoesFavoritarPesquisa.forEach(botao => {

                    const idJogo = botao.dataset.id

                    botao.addEventListener("click", event => {

                        event.preventDefault()

                        botao.classList.toggle("favoritado")

                        let lista = JSON.parse(localStorage.getItem("favoritos")) || []

                        if (botao.classList.contains("favoritado")) {
                            lista.push(idJogo)
                             const jogo = data.results.find(game => String(game.id) === idJogo)

                            listaFavoritos.innerHTML += `
                                <div class="card favorito-card" data-id="${jogo.id}">
                                    <h2>${jogo.name}</h2>
                                    <img src="${jogo.background_image}">
                                    <p>Nota: ${jogo.rating}</p>
                                    <p>Lançamento: ${new Date(jogo.released).toLocaleDateString("pt-BR")}</p>
                                </div>
                            `
                        } else {
                            lista = lista.filter(id => id !== idJogo)
                                const favorito = listaFavoritos.querySelector( `.favorito-card[data-id="${idJogo}"]`
            )
                            if(favorito) {
                                favorito.remove()
                            }
                        }

                        localStorage.setItem("favoritos", JSON.stringify(lista))

                       
                        })
                        const botoesJogandoPesquisa = document.querySelectorAll(".jogando")
                
                            botoesJogandoPesquisa.forEach(botao => {
                
                                botao.addEventListener("click", event => {
                
                                    event.preventDefault()
                
                                    idJogoSelecionado = botao.dataset.id
                
                                    confirmacaoJogando.style.display = "block"
                                })
                            })
                    })
                })
            })






const slider = document.querySelector(".slider")
const btnAnterior = document.querySelector(".anterior")
const btnProximo = document.querySelector(".proximo")

const games = document.querySelector("#games")
const gamesAnterior = document.querySelector(".games-anterior")
const gamesProximo = document.querySelector(".games-proximo")


let indice = 0
let imagens =[]
let indiceGames = 0
let limite = 0

function attSlider(){
    slider.style.transform = `translateX(-${indice * 100}%)`
}

function attGames(){
    games.style.transform = `translateX(-${indiceGames * 220}px)`
}

window.addEventListener("DOMContentLoaded", () => {
    const dataSession = localStorage.getItem("session")

    if(!dataSession){
        window.location.href = "index.html"
        return

    }
})
const apiKey = "e9e69d53b1d6436da9bc94e1bc18485a"
fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
       
       data.results.forEach(game => {
           imagens.push(game.background_image)
       })

       imagens.forEach(src => {
        const img = document.createElement("img")

        img.setAttribute("src", src)

        slider.appendChild(img)
       })


       let cards =""
       data.results.forEach(game => {
        const data = new Date(game.released)
        const generos = game.genres.map(genero => genero.name).join(",")

         cards += `
             <div class="card">
            <h2>${game.name}</h2>

            <button class="favoritar" data-id="${game.id}">♡</button>

            <img src="${game.background_image}">

            <p>Nota: ${game.rating}</p>

            <p>Lançamento: ${data.toLocaleDateString("pt-BR")}</p>

            <p class="genero">Gênero: ${generos}</p>

            <button class="jogando" data-id="${game.id}">Jogando</button>

        </div>
         `
       })
         divGames.innerHTML = cards

         let jogando = JSON.parse(localStorage.getItem("jogando")) || []

         data.results.forEach(game => {
            if(jogando.includes(String(game.id))){
                const historiaSalva = localStorage.getItem(`historia-${game.id}`) || ""


                listaJogando.innerHTML += `
                    <div class="jogo-jogando">
                     <div class="card">
                         <h2>${game.name}</h2>
                         <img src="${game.background_image}">
                         <p>Tempo médio: ${game.playtime} hrs</p>
                         <button class="remover-jogando" data-id="${game.id}">Remover</button>
                     </div>
                     <div class="folha-comentario">
                        <h3>História até agora</h3>
                     
                         <textarea placeholder="Escreva aqui...">${historiaSalva}</textarea>

                         <button class="salvar-historia" data-id="${game.id}">Salvar história</button>

                     </div>
                    </div>
                `
            }
         })
         const botoesSalvarHistoria = document.querySelectorAll(".salvar-historia")
         const botoesRemoverJogando = document.querySelectorAll(".remover-jogando")

         botoesRemoverJogando.forEach(botao => {
            botao.addEventListener("click", () => {
                const idJogo = botao.dataset.id
                let jogando = JSON.parse(localStorage.getItem("jogando")) || []
                jogando = jogando.filter(id => id !== idJogo)
                localStorage.setItem("jogando", JSON.stringify(jogando))

                botao.parentElement.parentElement.remove()
            })
         })


         botoesSalvarHistoria.forEach(botao =>{
            botao.addEventListener("click", () =>{
                const idJogo = botao.dataset.id
                const folha = botao.parentElement
                const textarea = folha.querySelector("textarea")
                const historia = textarea.value

                localStorage.setItem(`historia-${idJogo}`, historia)
            })
         })

         const favoritos = JSON.parse(localStorage.getItem("favoritos")) ||[]
         const botoesFavoritar = document.querySelectorAll(".favoritar")
         const botoesJogando = document.querySelectorAll(".jogando")


         

         botoesJogando.forEach(botao => {
            botao.addEventListener("click", event => {
                event.preventDefault()
                
                idJogoSelecionado = botao.dataset.id

                confirmacaoJogando.style.display = "block"
            })
         })

         cancelarJogando.addEventListener("click", () => {
            confirmacaoJogando.style.display = "none"
         })

         confirmarJogando.addEventListener("click", () => {
            let jogando = JSON.parse(localStorage.getItem("jogando")) || []

            if(jogando.length < 3){
                if(!jogando.includes(idJogoSelecionado)){
                    jogando.push(idJogoSelecionado)
                    localStorage.setItem("jogando", JSON.stringify(jogando))

                    confirmacaoJogando.style.display = "none"
                }
            }else {
                confirmacaoJogando.querySelector("p").innerText = "você já tem 3 jogos em Jogando."
            }
         })

         botoesFavoritar.forEach(botao => {
            const idJogo = botao.dataset.id

            if(favoritos.includes(idJogo)){
                botao.classList.add("favoritado")
            }
            botao.addEventListener("click", event => {
                event.preventDefault()
                botao.classList.toggle("favoritado")

                let lista = JSON.parse(localStorage.getItem("favoritos")) || []
                if (botao.classList.contains("favoritado")) {
                    lista.push(idJogo)
                }else {
                    lista = lista.filter(id => id !== idJogo)
                }
                localStorage.setItem("favoritos", JSON.stringify(lista))

                listaFavoritos.innerHTML = ""

                 data.results.forEach(game => {

                if(lista.includes(String(game.id))){

                    listaFavoritos.innerHTML += `
                    <div class="card">
                        <h2>${game.name}</h2>
                        <img src="${game.background_image}">
                        <p>Nota: ${game.rating}</p>
                        <p>Lançamento: ${new Date(game.released).toLocaleDateString("pt-BR")}</p>
                    </div>
                    `
                }
            })
         })
    })
        let cardsFavoritos = ""
        data.results.forEach(game => {
            if(favoritos.includes(String(game.id))){

                cardsFavoritos += `
                <div class="card">
                   <h2>${game.name}</h2>

                   <img src="${game.background_image}">

                   <p>Nota: ${game.rating}</p>

                   <p>Lançamento: ${new Date(game.released).toLocaleDateString("pt-BR")}</p>

                </div>
                `
            }
        })
        listaFavoritos.innerHTML = cardsFavoritos


         limite = data.results.length - 4
    })

btnProximo.addEventListener("click", event => {
    event.preventDefault()

    indice++
    if(indice > imagens.length - 1){
        indice = 0
    }
    attSlider()
})

btnAnterior.addEventListener("click", event => {
    event.preventDefault()

    indice--
    if(indice < 0){
        indice = imagens.length - 1
    }
    attSlider()
})

gamesProximo.addEventListener("click", event => {

    event.preventDefault()

    indiceGames++
    if(indiceGames > limite){
        indiceGames = limite
    }

    attGames()

})

gamesAnterior.addEventListener("click", event => {

    event.preventDefault()

    indiceGames--

    if(indiceGames < 0){

        indiceGames = 0

    }

    attGames()

})










btnExit.addEventListener("click", event => {

    event.preventDefault()

    localStorage.removeItem("session")

    window.location.href = "index.html"

})