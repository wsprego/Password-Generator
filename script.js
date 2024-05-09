/*capiturar as informações da 'tela' */
const inputEl = document.querySelector("#password")
const upperCaseCharsEl = document.querySelector("#uppercase-check")
const numberCharsEl = document.querySelector("#number-check")
const symbolcharsEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16

/*função que gera a senha aleatorea*/
function passwordGenerator(){
    let chars = "abcdefghjklmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolchars = "?!@&*()[]#$%"

    /*logica para verificar e add os elementos (abc,ACB,123,!@#&*()[]...)*/
    if(upperCaseCharsEl.checked){
        chars += upperCaseChars
    }

    if(numberCharsEl.checked){
        chars += numberChars
    }

    if(symbolcharsEl.checked){
        chars += symbolchars
    }

    let password= ""

    /*função de gerar a senha */
    for(let i=0; i<passwordLength; i++){
        const randomNumber = Math.floor(Math.random()*chars.length)

        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    /*calculo da barra de segurança de senha*/
    const percent = Math.round((passwordLength / 64) * 25 + 
    (upperCaseCharsEl.checked ? 15 : 0) + 
    (numberCharsEl.checked ? 25 : 0)+
    (symbolcharsEl.checked ? 35 : 0)
) 

    securityIndicatorBarEl.style.width = `${percent}%`

    if(percent > 69){
        //safe
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
    } else if(percent > 50){
        //warning
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("safe")
    } else{
        //critical
        securityIndicatorBarEl.classList.add("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("safe")
    }

    if(percent >= 100){
        securityIndicatorBarEl.classList.add("completed")
    } else{
        securityIndicatorBarEl.classList.remove("completed")
    }
  }

  function calculateFontSize(){
    if(passwordLength > 35){
        inputEl.classList.remove("font-ms")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if(passwordLength > 25){
        inputEl.classList.remove("font-ms")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs")
    } else if(passwordLength > 22){
        inputEl.classList.add("font-ms")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    } else{
        inputEl.classList.remove("font-ms")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }
  }

/*função de copiar senha */
function copy(){
    navigator.clipboard.writeText(inputEl.value)
}

/*função para inserir no input*/
const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function(){
    passwordLength = passwordLengthEl.value
    document.querySelector('#password-length-text').innerText = passwordLength

    /*chamando a função de gerar a senha*/
    passwordGenerator()
})

/*testa se o check-box esta marcado e chama o gerador de senha*/
upperCaseCharsEl.addEventListener("click",passwordGenerator)
numberCharsEl.addEventListener("click",passwordGenerator)
symbolcharsEl.addEventListener("click",passwordGenerator)

/*chamando a função de copiar e fazendo a copia do texto */
document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", passwordGenerator)

/*chamando a função de gerar a senha*/
passwordGenerator()