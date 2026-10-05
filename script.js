const formLogin = document.querySelector("#form-login")
if(formLogin){
    const iptEmail = document.querySelector("#ipt-email")
    const iptSenha = document.querySelector("#ipt-senha")
    const msgError = document.querySelector("#msg-error")

    formLogin.addEventListener("submit", event => {
        event.preventDefault()

        const dataForm = new FormData(formLogin)
        const dataLogin ={
            email: dataForm.get("email"),
            senha: btoa(dataForm.get("senha"))
        }
        const dataStorage = localStorage.getItem("cadastro")

        const cadastro = JSON.parse(dataStorage)
      

        if(dataLogin.email === cadastro.email && dataLogin.senha === cadastro.senha){
            localStorage.setItem("session", "true")

            window.location.href = "home.html"

        } else {
            msgError.innerText = "Email ou senha incorretos!"
        }
    })
}
const formCadastro = document.querySelector("#form-cadastro")

if(formCadastro){
    const iptCep = document.querySelector("#ipt-cep")

    const iptRua = document.querySelector("#ipt-rua")

    const iptBairro = document.querySelector("#ipt-bairro")

    const iptCidade = document.querySelector("#ipt-cidade")

    iptCep.addEventListener("change", event => {
        event.preventDefault()
        const url = `https://viacep.com.br/ws/${iptCep.value}/json/`

        fetch(url)
             .then(response => response.json())
             .then(data => {
                iptRua.value = data.logradouro
                iptBairro.value = data.bairro
                iptCidade.value = data.localidade
            })
    })

    formCadastro.addEventListener("submit", event => {
        event.preventDefault()

        const dataForm = new FormData(formCadastro)
        const dataCadastro ={
            nome: dataForm.get("nome"),
            email: dataForm.get("email"),
            senha: btoa(dataForm.get("senha")),
            cep: dataForm.get("cep"),
            rua: dataForm.get("rua"),
            bairro: dataForm.get("bairro"),
            cidade: dataForm.get("cidade")
        }
        localStorage.setItem("cadastro", JSON.stringify(dataCadastro))
        
        formCadastro.reset()
        window.location.href = "index.html"
    })
}