//TODO: create a start button
    //TODO: start button must start a timer
    //TODO: start button must present a question
//TODO: present another question when user answers the previous one

//TODO: when the timer reaches 0 then the game is over
//TODO: when all the questions are answered then the game is over
//TODO: display score at end
//TODO: create input that user can save his/her initials and score 
//TODO: create function that subtracts ten seconds from score/ timer when answer is wrong
//TODO: (optional) create a link that clears high scores

//TODO: create function to end game (when timer reaches 0 or when all the questions are answered)
//TODO: add event listener for "start quiz" button to start timer on click
//TODO: add function to start button to show first question and answer selections

var timerEl = document.querySelector(".scoreTimer");
var countDownEl = document.getElementById("countDown");
var secondsLeft = 60;

var startButton = document.querySelector(".startButton")

var instructionsElement = document.getElementById("instructions");
var questionContainerElement = document.getElementById("questionContainer");

// array of questions and answers for the quiz
var questionIndex = 0;
var questionArray = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with __________.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "curly brackets"
    }, 
    {  
        question: "Arrays in JavaScript can be used to store __________.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }
];


startButton.addEventListener("click", startQuiz);

instructionsElement.classList.remove("hide");


function startQuiz() {
    currentQuestion = 0;
    startTimer();
    instructionsElement.classList.add("hide");
    questionIndex = 0;
    setNextQuestion();
}

function startTimer() {

    var secondsLeft = 60;
    var timerInterval = setInterval(function() { 
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;


    
    if (secondsLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
    }

  }, 1000);
   
}

var questionContainerElement = document.getElementById("questionContainer")
var answerContainerElement = document.getElementById("answerContainer")
var answerTextContainerElement = document.getElementById("answerTextContainer")

function setNextQuestion() {

    document.querySelector("#questionContainer").innerHTML = questionArray[currentQuestion]["question"];
 
    if (currentQuestion < 5) {
        for (var index = 0; index < questionArray[currentQuestion]["answers"].length; index++) {
            var answerButton = document.createElement("button");
            answerButton.textContent = questionArray[currentQuestion]["answers"][index];
            answerButton.className = "answerChoice";
            questionContainerElement.appendChild(answerButton); 
    }

    document.querySelectorAll(".answerChoice").forEach(item => {
        item.addEventListener("click", event => {
        if (event.target.innerHTML == questionArray[currentQuestion].correctAnswer) {
            answerText = "Correct!";
        }
        else {
            answerText = "Incorrect!";
            countDownEl -= 10;
        }

        currentQuestion = currentQuestion +1;
        answerTextContainer.textContent = answerText;
        
        if (currentQuestion >= 5) {
            endQuiz();
        }

        else {
            setNextQuestion();
        }
        }
        )
    })
}
}
