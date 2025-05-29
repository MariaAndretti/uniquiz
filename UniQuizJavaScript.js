const caixaUniQuiz = document.getElementById("caixaUniQuiz");
const perguntaUniQuiz = document.getElementById("questaoUniQuiz");
const opcoesRespostas = document.getElementById("opcoesRespostas"); 
const botaoProximo = document.getElementById("botaoProximo"); 
const resultadoQuiz = document.getElementById("resultadoUniQuiz");
const pontuacaoQuiz = document.getElementById("pontuacaoUniQuiz");

const questoes = [
    {
        questao: "Qual é o maior deserto do mundo?",
        opcoes: ["Saara", "Atacama", "Antártida", "Deserto de Gobi"],
        respostaCorreta: "Antártida"
    },
    {
        questao: "Qual é a capital do Brasil?",
        opcoes: ["Paraná", "Brasília", "Rio de Janeiro", "São Paulo"],
        respostaCorreta: "Brasília"
    },
    {
        questao: "Qual é a capital da Austrália?",
        opcoes: ["	Sydney", "Canadá", "Nova Zelândia", "Camberra"],
        respostaCorreta: "Camberra"
    },
    {
        questao: "Qual é o país com maior população no mundo?",
        opcoes: ["Índia", "China", "Estados Unidos", "Indonésia"],
        respostaCorreta: "Índia"
    },
    {
        questao: " Qual a linha imaginária que atravessa o Brasil?",
        opcoes: ["Equador", "Círculo Polar Ártico", "Trópico de Cancêr", "Greenwich"],
        respostaCorreta: "Equador"
    },
    {
        questao: "Qual o oceano que banha o Brasil?",
        opcoes: ["Pacífico", "Índico", "Atlântico", "Ártico"],
        respostaCorreta: "Atlântico"
    },
    {
        questao: "Qual é o principal combustível fossil da 1 Revolução Industrial?",
        opcoes: ["Óleo Diesel", "Petróleo", "Carvão Mineral", "Gás Natural"],
        respostaCorreta: "Carvão Mineral"
    },
    {
        questao: "Qual é o único continente com terra nos quatro hemisférios?",
        opcoes: ["Europa", "Ásia", "Oceania", "África"],
        respostaCorreta: "África"
    },
    {
        questao: "Além da Turquia, qual outro país está presente em dois continentes?",
        opcoes: ["Rússia", "China", "Japão", "Itália"],
        respostaCorreta: "Rússia"
    },
    {
        questao: "Qual é o movimento terrestre responsável pela ocorrência das estações do ano?",
        opcoes: ["Nutação", "Transformação", "Rotação", "Translação"],
        respostaCorreta: "Translação"
    },
     
    

];

let indiceQuestaoAtual = 0;
let pontuacao = 0;

function carregarQuestao() {
    resultadoQuiz.style.display = "none";
    caixaUniQuiz.style.display = "qblock"; 
    botaoProximo.style.display = "none";
    
    const questaoAtual = questoes[indiceQuestaoAtual];
    perguntaUniQuiz.textContent = questaoAtual.questao;
    opcoesRespostas.innerHTML = "";

    questaoAtual.opcoes.forEach(opcao => {
        const botao = document.createElement("button");
        botao.textContent = opcao;
        botao.classList.add("answer-btn");
        botao.addEventListener("click", () => verificarResposta(opcao));
        opcoesRespostas.appendChild(botao);
    });
}

function verificarResposta(respostaSelecionada) {
    const questaoAtual = questoes[indiceQuestaoAtual];
    const botoesResposta = opcoesRespostas.querySelectorAll(".answer-btn"); 
    
    botoesResposta.forEach(botao => {
        if (botao.textContent === questaoAtual.respostaCorreta) {
            botao.classList.add("correct");
        }
        if (botao.textContent === respostaSelecionada && respostaSelecionada !== questaoAtual.respostaCorreta) {
            botao.classList.add("incorrect");
        }
        botao.disabled = true;
    });

    if (respostaSelecionada === questaoAtual.respostaCorreta) {
        pontuacao++;
    }

    botaoProximo.style.display = "block";
}

function proximaQuestao() {
    indiceQuestaoAtual++;
    if (indiceQuestaoAtual < questoes.length) {
        carregarQuestao();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    caixaUniQuiz.style.display = "none";
    resultadoQuiz.style.display = "block";
    pontuacaoQuiz.textContent = `${pontuacao} de ${questoes.length}`;
}

botaoProximo.addEventListener("click", proximaQuestao);
document.addEventListener("DOMContentLoaded", carregarQuestao)