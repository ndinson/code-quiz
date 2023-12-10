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

// global variables
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

// functions to start quiz
startButton.addEventListener("click", startQuiz);
instructionsElement.classList.remove("hide");

function startQuiz() {
    currentQuestion = 0;
    startTimer();
    instructionsElement.classList.add("hide");
    questionIndex = 0;
    setNextQuestion();
}

// function to start timer when start quiz button is clicked
function startTimer() {    

        secondsLeft = 60;

    var timerInterval = setInterval(function() { 
        secondsLeft--;
        timerEl.textContent = "Timer: " + secondsLeft + " Second(s)";  

// timer will stop when reaching 0 or when all questions are answered
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

// displays question with its set of answers for user to select
function setNextQuestion() {
    document.querySelector("#questionContainer").innerHTML = questionArray[currentQuestion]["question"];
 
    if (currentQuestion < 5) {
        for (var index = 0; index < questionArray[currentQuestion]["answers"].length; index++) {
            var answerButton = document.createElement("button");
            answerButton.textContent = questionArray[currentQuestion]["answers"][index];
            answerButton.className = "answerChoice";
            questionContainerElement.appendChild(answerButton); 
    }

// when user clicks answer choices, system will let them know if correct and if wrong, will deduct 10 seconds off time
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

// next question will be set or quiz will end if the last question has been answered
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

// at end of quiz, final score, input for initials, and high scores will be shown
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

// scores will be saved to local storage and still load upon refresh of page
var scorePageElement = document.getElementById("scorePage")
var saveButtonElement = document.getElementById("saveButton")
var backButtonElement = document.getElementById("goBack")
var clearScoreElement = document.getElementById("clearScores")
var initialsText = document.getElementById("initials")
var listElement = document.getElementById("list")
var instructionsElement = document.getElementById("instructions")
var scoreListElement = document.getElementById("scoreList")

function userForm() {   

saveButtonElement.classList.remove("hide")
scorePageElement.classList.remove("hide")

saveButtonElement.addEventListener ("click", function() {
    scoreListElement.classList.remove("hide");
    saveLastScore();
    renderScores();
})

function saveLastScore() {    
    var initialsInput = document.querySelector("#initials")
    if (initialsInput === "") {
       window.initialsInput.alert("Please Enter Initials!");
    }

    else {
        var userData = {
        initials: initialsInput.value,
        score: userScore
        }
        
        localStorage.setItem("userData", JSON.stringify(userData))
        }
    }
function renderScores() {
    
    var lastScore = JSON.parse(localStorage.getItem("userData"));

    if(lastScore !== null) {
        document.getElementById("user-data").innerHTML = lastScore.initials + " - " + lastScore.score + " Points";
    }
    else {
        return;
    }
    };
   
    // clear score function
    clearScoreElement.classList.remove("hide");
    clearScoreElement.addEventListener("click", () => {
    localStorage.clear();
    document.querySelector("#user-data").innerHTML="";
    })


     // go back to start of quiz
     backButtonElement.classList.remove("hide");
     document.getElementById("goBack").addEventListener("click", () => {
        location.reload();     
     })
};
   // view score list
   var viewScoresElement = document.getElementById("viewScores")
   var questionContainerElement = document.getElementById("questionContainer")
   var answerContainerElement = document.getElementById("answerContainer")
   var answerTextContainerElement = document.getElementById("answerTextContainer")
   
   viewScoresElement.addEventListener ('click', function() {
   // ! Hide all pages and show scorePage
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


       var lastScore = JSON.parse(localStorage.getItem("userData"));
       document.getElementById("user-data").innerHTML = lastScore.initials + " - " + lastScore.score + " Points";

});


 



  
   


  




