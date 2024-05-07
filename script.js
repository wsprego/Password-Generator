let passwordLength = 16
const inputEl = document.querySelector("#password")

/*função que gera a senha aleatorea*/
function passwordGenerator(){
    const chars = "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]#$%"

    let password= ""

    /*função de gerar a senha */
    for(let i=0; i<passwordLength; i++){
        const randomNumber = Math.floor(Math.random()*chars.length)

        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password

}

/*função de copiar senha */
function copy(){
    navigator.clipboard.writeText(inputEl.value)
}

/*função para inserir no input*/
const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function(){
    passwordLength = passwordLengthEl.value

    /*chamando a função de gerar a senha*/
    passwordGenerator()
})

/*chamando a função de copiar e fazendo a copia do texto */
const copyButtonEl = document.querySelector("#copy")
copyButtonEl.addEventListener("click", copy)

/*chamando a função de gerar a senha*/
passwordGenerator()