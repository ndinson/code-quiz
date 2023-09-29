//TODO: create a start button
    //TODO: start button must start a timer
    //TODO: start button must present a question
//TODO: present another question when user answers the previous one
//TODO: create function that subtracts time from clock when answer is wrong
//TODO: when the timer reaches 0 then the game is over
//TODO: when all the questions are answered then the game is over
//TODO: display score at end
//TODO: create input that user can save his/her initials and score 






var timerEl = document.querySelector(".scoreTimer");
var countDownEl = document.getElementById("countDown");
var secondsLeft = 60;

var startButton = document.querySelector(".startButton")


function startTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      endGame();
//TODO: create if statement to end game function
    }

  }, 1000);
}


function endGame() {
      
}

//TODO: add event listener for "start quiz" button to start timer on click 
startButton.addEventListener("click", startTimer);




var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false},
        ] 
    },
    {
        question: "The condition in an if / else statement is enclosed with __________.",
        answers: [
            {text: "quotes", correct: false},
            {text: "curly brackets", correct: true},
            {text: "parenthesis", correct: false},
            {text: "square brackets", correct: false},
        ] 
    }, 
    {  
        question: "Arrays in JavaScript can be used to store __________.",
        answers: [
            {text: "numbers and strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above ", correct: true}, 
        ] 
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        answers: [
            {text: "commas", correct: false},
            {text: "curly brackets", correct: false},
            {text: "quotes", correct: true},
            {text: "parenthesis", correct: false}, 
        ] 
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            {text: "JavaScript", correct: false},
            {text: "terminal/bash", correct: false},
            {text: "for loops", correct: false},
            {text: "console.log", correct: true},
        ]
    }
] 

var currentQuestionIndex = 0;
var score = 60;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 60;
    showQuestion();
}

function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionNumber = currentQuestionIndex +1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        
        var button = document.createElement("answerButtons");
        button.innerHTML = answer.text;
        button.classList.add("banswerButton");
        answerButton.appendChild(button);
    })
}

