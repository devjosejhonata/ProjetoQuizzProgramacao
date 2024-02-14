
/* Declaração de variaveis */

const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];//array das alternativas de cada questão
let points = 0; //vai marcar os pontos que o usuário tem no quizz
let actualQuestion = 0; //saber qual pergunta estou no meu quizz

/* PERGUNTAS */

const questions = [//Array de objetos com perguntas e respostas
    {
      "question": "PHP foi desenvolvido para qual fim?",//PERGUNTA
      "answers": [//Alternativas e respostas
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
        
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",//PERGUNTA
      "answers": [//Alternativas e respostas
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
        
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",//PERGUNTA
      "answers": [//Alternativas e respostas
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
       
      ]
    },
  ];

/* SUBSTITUIÇÃO DO QUIZZ PARA A PRIMEIRA PERGUNTA  */

function init() {//criar a primeira pergunta
    createQuestion(0)
}

/* CRIA UMA PERGUNTA */

function createQuestion(i) {//função que imprime qualquer pergunta, independente da pergunta tual na tela, funçao dinamica

    // - Limpar a questão anterior // 
    const oldButtons = answersBox.querySelectorAll("button");
    /* sempre utilizaremos esse cara pra limpar as alternativas da pergunta e assim eu poder 
    imprimir a proxima pra poder jogar denovo */

    oldButtons.forEach(function (btn) {
        btn.remove();
    });

    // - Alterar o texto da pergunta //
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    // - mudar o meu arrey de perguntas, alterar o texto do elemento //
    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // - Insere as alternativas //
    questions[i].answers.forEach(function(answer, i) {//aqui dentro vou acessar tanto o texto quanto o indice de cada pergunta

        //cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];//o i é o indice da questão
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]); //atributo que diz se a pergunta é a correta ou não

        //removendo as classe que nao preciso, hide e template class
        answerTemplate.classList.remove("hide"); 
        answerTemplate.classList.remove("answer-template");
        
        answersBox.appendChild(answerTemplate);//alternativas colocadas na tela na ordem correta

        //inserir evento de clique no botão
        answerTemplate.addEventListener("click", function() {
          checkAnswer(this);//esse this é o button que eu quero
        });

    });

    //Aqui fora do forEach eu vou Incrementar o número da questão
    actualQuestion++;//a proxima questao ja é o nº 2 entao nao posso repetir ela, com esse meu parametro vou fazer a proxima pergunta

}

/* VERIFICADNO RESPOSTA DO USUÁRIO */

function checkAnswer(btn) {

     //seleciona todos os botoes
     const buttons = answersBox.querySelectorAll("button");//acessando todos os botoes presentes dentro do html #answers-box
     
     // verifica se a resposta está correta e adiciona classes aos botões
     buttons.forEach(function(button) {//vou ter acesso ao botao atual do loop
        
         if(button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer"); //quando a resposta for correta, classe verde

            //checa se o usuário acertou a pergunta
            if(btn === button) {
              //incremento dos pontos
              points++;
            }

         } else {

            button.classList.add("wrong-answer"); //quando der a resposta errada

         }
     });

     //exibir proxima pergunta para o usuário
     nextQuestion();

}

/* EXIBE A PRÓXIMA PERGUNTA DO QUIZZ */

function nextQuestion() {//n recebo nenhum parametro porem vou saber que tenho que ir para a proxima pergunta pois tenho acesso ao, actualQuestion

    // timer para o usuário ver as respostas
    setTimeout(function() {

        // verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
           //apresentar a msg de sucesso
           showSuccessMessage();
           return;

        }

        createQuestion(actualQuestion);//chamando a proxima pergunta

    }, 700);

}

/* EXIBE A TELA FINAL */
function showSuccessMessage() {
    
    hideOrShowQuizz();//função que mostra ou esconde o score

    //trocar dados da tela de suceso

    //calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);
          /* numero de pontos dividido pelo total de perguntas, se 
          eu multiplicar por 100 vou ter a porcentagem do que acertou.
          O toFixed(2) eu limito 2 casas após a virgula para eu nao ter
          numeros quebrados. */
    
    const displayScore = document.querySelector("#display-score span");//mudar os dados

    displayScore.textContent = score.toString();//converter texto

    //alterar o numero de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    //alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
              /* informa quantas perguntas eu acertei do 
              total de perguntas do quizz */
}

/* MOSTRA OU ESCONDE O SCORE */

function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

/* REINICIAR QUIZZ */

const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {

  //zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
       /* invocando essa função novamente, hideOrShowQuizz(); , ao invés de 
       mostrar o score, vai mostrar o quizz e esconder o score, utilizamos o 
       toggle, se tiver o hide vai tirar, senao tiver vai colocar, inverte. */
  init();//chamo o init() pra começar o jogo novamente.

});

/* INICIALIZAÇÃO DO QUIZZ */ 

init();
