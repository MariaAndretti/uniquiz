const diviniciar = document.getElementById("diviniciar")
const divareajogo = document.getElementById("areajogo")
const titulodapergunta = document.getElementById("titulopergunta")
const btniniciar = document.getElementById("botaoiniciar")
const pxmpergunta = document.getElementById("botaoProximo")

const btnproximapergunta = document.querySelector(".botaoProximo")
const divplacar = document.getElementById("placar")
const qtdacertos = document.getElementById("quantidadeacertos")
const btnreiniciar = document.getElementById("reiniciar")
const porcentagem = document.getElementById("tituloporcentagem")
const nomeuser = document.getElementById("nomeusuario")



btniniciar.disabled = true
btniniciar.addEventListener("click", () => iniciarjogo)
pxmpergunta.addEventListener("click", proximapergunta)
nomeuser.addEventListener("focusout", validarNome)
const rankUsuarios = []


const perguntas = [
    
    {pergunta:"Qual é o maior deserto do mundo?", opcoes:["Saara","Antártida","Atacama","Gobi"], correta:"Antártida"},

    {pergunta:"Qual é a capital do Brasil?", opcoes:["Rio de janeiro","São Paulo","Brasília","Paraná"], correta:"Brasília"},

    {pergunta:"Qual é a capital da Austrália?", opcoes:["Camberra","Sidney","Canadá","Cidade da Austrália"], correta:"Camberra"},

    {pergunta:"Qual é o país com maior população no mundo?", opcoes:["China","Índia","Paraguai","Chile"], correta:"Índia"},

    {pergunta:"Qual a linha imaginária que atravessa o Brasil?", opcoes:["Meridíano de Greenwich","Trópico de Capricórnio","Trópico de Câncer","Linha do Equador"], correta:"Linha do Equador"},
    {pergunta:"Qual o oceano que banha o Brasil?", opcoes:["Atlântico","Pacífico","Índico","Ártico"], correta:"Atlântico"},

];

let indiceperguntas = 0
let botaodepergunta = document.createElement("button")
let contadorderespostacorreta = 0



/* Funções */
function iniciarjogo(){

    fecharbotaoinicio()
    abrirareajogo()
}

function fecharbotaoinicio(){

    diviniciar.innerHTML = " "
}

function abrirareajogo(){

    divareajogo.classList.add("active")
    btnproximapergunta.disabled = true

    titulodapergunta.textContent = perguntas[indiceperguntas].pergunta
    areaperguntas.innerHTML = ""

    perguntas[indiceperguntas].opcoes.forEach(opcao => {

    let botaodepergunta = document.createElement("button")

    botaodepergunta.textContent = opcao
    botaodepergunta.classList.add("answer-btn")
    botaodepergunta.addEventListener("click", () => validarrespostacorreta(opcao))

    areaperguntas.appendChild(botaodepergunta)

 })
}

function validarrespostacorreta(btnSelecionado){

    const botoesdaTela = document.querySelectorAll(".answer-btn")    
    const respostacorreta = perguntas[indiceperguntas].correta
    botoesdaTela.forEach(botao => {

        if(botao.textContent === respostacorreta){
            botao.classList.add("correct")
        
        }
        if(botao.textContent === btnSelecionado && botao.textContent != respostacorreta){
            botao.classList.add("incorrect")
            
        }
        botao.classList.add("disable")
        botao.disabled = true

    })
    if(btnSelecionado === respostacorreta){
        contadorderespostacorreta++
    }
    btnproximapergunta.disabled = false
}


function proximapergunta(){
    indiceperguntas++
    if (indiceperguntas < perguntas.length)
        abrirareajogo()
    else{
        encerrarjogo()
    }
}
    function encerrarjogo(){

      divareajogo.classList.remove("active")
      divplacar.classList.add("active")
      qtdacertos.textContent = ("Fim de jogo, você acertou " +contadorderespostacorreta+ " de " +perguntas.length + mostrarPorcentagemCorreta())
      btnreiniciar.addEventListener("click", () => location.reload())
      `Você acertou ${contadorderespostacorreta}` + mostrarPorcentagemCorreta()
      salvaPontuacaoUsuario();

}

  function mostrarPorcentagemCorreta() {

    const porcentagem = calcularPorcentagemRespostasCorretas()

    if (porcentagem <=30)
        return "Precisa melhorar"

    else if (porcentagem <=70)
        return "Regular"

    else if (porcentagem <99)
        return "Muito Bom!"

    else
    return "Excelente"
}

   function calcularPorcentagemRespostasCorretas() {

     return contadorderespostacorreta * 100/ perguntas.length

}

   function salvaPontuacaoUsuario(){
   
      localStorage.setItem(nomeuser.value,contadorderespostacorreta);
    
}
   function validarNome() {
    if (nomeuser.value.length > 0 ) {
        btniniciar.disabled = false
    }
   }

