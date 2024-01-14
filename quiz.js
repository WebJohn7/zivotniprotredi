const question = [
    {
        question: "What's the biggest threat to the environment?",
        answers: [
            { text: "Deforestation", correct: false},
            { text: "Overpopulation", correct: false},
            { text: "Global warming", correct: true},
            { text: "Nuclear energy", correct: false},
        ]
    },
    {
        question: "What do greenhouse gases causes?",
        answers: [
            { text: "Climate change", correct: true},
            { text: "Deforestation", correct: false},
            { text: "Ocean pollution", correct: false},
            { text: "Air pollution", correct: false},
        ]
    },
    {
        question: "What's carbon dioxide?",
        answers: [
            { text: "Deforestation", correct: false},
            { text: "Overpopulation", correct: false},
            { text: "Fossil fuel", correct: false},
            { text: "CO2", correct: true},
        ]
    },
    {
        question: "What is our environment?",
        answers: [
            { text: "Everything around us", correct: true},
            { text: "How we live", correct: false},
            { text: "It only includes plants and animals, not human-made things", correct: false},
            { text: "Weather", correct: false},
        ]
    },
    {
        question: "What's a greenhouse effect?",
        answers: [
            { text: "Painting a house to a green color", correct: false},
            { text: "A dance move", correct: false},
            { text: "Gases that trap the sun's heat and making the Earth warmer", correct: true},
            { text: "A method used in architecture to create houses made of glass", correct: false},
        ]
    },
    {
        question: "What's the biggest cause of climate change?",
        answers: [
            { text: "Pollution", correct: false},
            { text: "Hurricanes", correct: false},
            { text: "Earthquake ", correct: false},
            { text: "Deforestation", correct: true},
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById ("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}
function resetState () {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer (e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add ("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from (answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState ();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
function handleNextButton () {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    }else {
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});
startQuiz();