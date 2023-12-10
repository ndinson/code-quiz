// Global Variables
var timerEl = document.querySelector(".scoreTimer");
var countDownEl = document.getElementById("countDown");
var secondsLeft = 60;

var startButton = document.querySelector(".startButton")

var instructionsElement = document.getElementById("instructions");
var questionContainerElement = document.getElementById("questionContainer");

// Array of questions and answers for the quiz.
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

// Functions to start quiz.
startButton.addEventListener("click", startQuiz);
instructionsElement.classList.remove("hide");

function startQuiz() {
    currentQuestion = 0;
    startTimer();
    instructionsElement.classList.add("hide");
    questionIndex = 0;
    setNextQuestion();
}

// Function to start timer when start quiz button is clicked.
function startTimer() {    

        secondsLeft = 60;

    var timerInterval = setInterval(function() { 
        secondsLeft--;
        timerEl.textContent = "Timer: " + secondsLeft + " Second(s)";  

    // Timer will stop when reaching 0 or when all questions are answered.
    if (secondsLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
    }

    if (currentQuestion >= 5) {
        clearInterval(timerInterval);
        endQuiz();
    }    

  }, 1000);
}

var questionContainerElement = document.getElementById("questionContainer")
var answerContainerElement = document.getElementById("answerContainer")
var answerTextContainerElement = document.getElementById("answerTextContainer")

// Function that displays question with its set of answers for user to select.
function setNextQuestion() {
    document.querySelector("#questionContainer").innerHTML = questionArray[currentQuestion]["question"];
 
    if (currentQuestion < 5) {
        for (var index = 0; index < questionArray[currentQuestion]["answers"].length; index++) {
            var answerButton = document.createElement("button");
            answerButton.textContent = questionArray[currentQuestion]["answers"][index];
            answerButton.className = "answerChoice";
            questionContainerElement.appendChild(answerButton); 
    }

    // When user clicks answer choices, system will let them know if correct and if wrong, will deduct 10 seconds off time.
    document.querySelectorAll(".answerChoice").forEach(item => {
        item.addEventListener("click", event => {
            if (event.target.innerHTML == questionArray[currentQuestion].correctAnswer) {
            answerText = "Correct!";
            }
            else {
            answerText = "Wrong!";
            secondsLeft = secondsLeft - 10;
            }

            currentQuestion = currentQuestion +1;
            answerTextContainer.textContent = answerText;

    // Next question will be set or quiz will end if the last question has been answered.
            if (currentQuestion >= 5) {
                endQuiz();
            }

            else {
                setNextQuestion();
            }
        
            }
        )}
    )}
}

var finalScoreElement = document.getElementById("finalScore")

// Function that displays final score and a form option for user to save their score.
function endQuiz() {
    userForm();
    document.querySelector("#questionContainer").innerHTML = ""
    document.querySelector("#answerTextContainer").innerHTML = ""
    finalScoreElement.innerHTML = "Your Score Is: " + secondsLeft; 
    timerEl.textContent = "Time Is Up!";
    if (secondsLeft < 0) {
        finalScoreElement.innerHTML = "Your Score Is: " + 0;
        userScore = 0;
    }
    else {
        userScore= secondsLeft;
    }
}

var scorePageElement = document.getElementById("scorePage")
var saveButtonElement = document.getElementById("saveButton")
var backButtonElement = document.getElementById("goBack")
var clearScoreElement = document.getElementById("clearScores")
var initialsText = document.getElementById("initials")
var listElement = document.getElementById("list")
var instructionsElement = document.getElementById("instructions")
var scoreListElement = document.getElementById("scoreList")

// Funtion that loads form for user to save initials and score to local storage.
function userForm() {   

saveButtonElement.classList.remove("hide")
scorePageElement.classList.remove("hide")

saveButtonElement.addEventListener ("click", function() {
    scoreListElement.classList.remove("hide");
    saveLastScore();
    renderScores();
})

// Function that saves user data to local storage.
function saveLastScore() {    
    var initialsInput = document.querySelector("#initials")
    if (initialsInput === "") {
       alert("Please Enter Initials!");
    }

    else {
        var userData = {
        initials: initialsInput.value,
        score: userScore
        }
        
        localStorage.setItem("userData", JSON.stringify(userData))
        }
    }

// Function that displays user data to html page, confirming save to local storage.    
function renderScores() {
    
    var lastScore = JSON.parse(localStorage.getItem("userData"));

    if(lastScore !== null) {
        document.getElementById("user-data").innerHTML = lastScore.initials + " - " + lastScore.score + " Points";
    }
    else {
        return;
    }
    };
   
    // Clear score funtion which removes saved data from locoal storage and removes parsed data from the html page.
    clearScoreElement.classList.remove("hide");
    clearScoreElement.addEventListener("click", () => {
    localStorage.clear();
    document.querySelector("#user-data").innerHTML="";
    })

     // Go Back button which takes user to instructions page.
     backButtonElement.classList.remove("hide");
     document.getElementById("goBack").addEventListener("click", () => {
        location.reload();     
     })
};
   // View Score List
   var viewScoresElement = document.getElementById("viewScores")
   var questionContainerElement = document.getElementById("questionContainer")
   var answerContainerElement = document.getElementById("answerContainer")
   var answerTextContainerElement = document.getElementById("answerTextContainer")
   
   // Function to hide all pages from view except for saved scores and Go Back/ Clear Scores buttons.
   viewScoresElement.addEventListener ('click', function() {
    endQuiz();
       questionContainerElement.classList.add("hide");
       answerContainerElement.classList.add("hide");
       answerTextContainerElement.classList.add("hide");
       instructionsElement.classList.add("hide");
       document.querySelector("header").classList.add("hide");
       document.querySelector("#initialsTag").classList.add("hide");
       document.querySelector("input").classList.add("hide");
       document.querySelector("#saveButton").classList.add("hide");
       scoreListElement.classList.remove("hide");
       listElement.classList.remove("hide");
       listElement.innerHTML = "Score List";
       document.querySelector("#user-data").classList.remove("hide");
       finalScoreElement.classList.add("hide");

    // Data is parsed from local storage to display saved scores onto html page.
       var lastScore = JSON.parse(localStorage.getItem("userData"));
       document.getElementById("user-data").innerHTML = lastScore.initials + " - " + lastScore.score + " Points";

});