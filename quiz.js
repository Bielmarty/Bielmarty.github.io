const quizData = [
    {
        question: "Qual organela é responsável pela produção de energia na célula?",
        options: ["Lisossomo", "Mitocôndria", "Ribossomo", "Cloroplasto"],
        answer: "Mitocôndria"
    },
    {
        question: "Qual organela é responsável pela fotossíntese?",
        options: ["Mitocôndria", "Complexo de Golgi", "Cloroplasto", "Lisossomo"],
        answer: "Cloroplasto"
    },
    {
        question: "Onde ocorre a produção de proteínas na célula?",
        options: ["Lisossomo", "Ribossomo", "Vacúolo", "Peroxissomo"],
        answer: "Ribossomo"
    },
    {
        question: "O que faz o Complexo de Golgi?",
        options: ["Produz energia", "Faz a digestão celular", "Armazena, modifica e exporta substâncias", "Realiza fotossíntese"],
        answer: "Armazena, modifica e exporta substâncias"
    },
    {
        question: "Qual célula possui cloroplasto?",
        options: ["Célula animal", "Célula vegetal", "Célula bacteriana", "Célula fúngica"],
        answer: "Célula vegetal"
    }
];

let currentQuestion = 0;
let score = 0;

const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const nextButton = document.getElementById('nextButton');

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];

    quiz.innerHTML = `
        <div class="question">
            <h2>${currentQuiz.question}</h2>
            <ul class="answers">
                ${currentQuiz.options.map(option => 
                    `<li><button onclick="selectAnswer(this)">${option}</button></li>`
                ).join('')}
            </ul>
        </div>
    `;
    result.innerHTML = "";
    nextButton.style.display = "none";
}

function selectAnswer(button) {
    const selected = button.innerText;
    const currentQuiz = quizData[currentQuestion];

    const buttons = document.querySelectorAll('.answers button');

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === currentQuiz.answer) {
            btn.classList.add('correct');
        } else if (btn.innerText === selected && selected !== currentQuiz.answer) {
            btn.classList.add('wrong');
        }
    });

    if (selected === currentQuiz.answer) {
        score++;
        result.innerHTML = "<p style='color:green'>✔️ Resposta correta!</p>";
    } else {
        result.innerHTML = `<p style='color:red'>❌ Resposta incorreta. A correta é: ${currentQuiz.answer}</p>`;
    }

    nextButton.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        quiz.innerHTML = `<h2>Você acertou ${score} de ${quizData.length} questões.</h2>`;
        nextButton.style.display = "none";
        result.innerHTML = "<p>Parabéns por completar o quiz!</p>";
    }
}

loadQuestion();
