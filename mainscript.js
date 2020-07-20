// Update/ Manipulate inner HTML of our elements
//https: www.youtube.com/watch?v=49pYIMygIcU 

var startQuizBtn = document.getElementById("startBtn");
var submitQuizBtn = document.querySelector("button.submitBtn")
var timeLeft = (quizQuestions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var questionHead = document.getElementById("questions");
var correctOptions = document.getElementById("answers");

// Global variables
var userNameInput;
var questionNumber = -1;
var correct;

// This function start timer
function startTimer() {
    document.getElementById("main").classList.add('d-none');
    document.getElementById("quiz-container").classList.remove('d-none');
    //Set the time 
    setTimer();
    // This method create questions to display
    generateQuizQuestions();
}
// This method set the time and begins 90s countdown
function setTimer() {

    var countdown = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft === 0 || questionNumber === quizQuestions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}
// This function itarate through the object array containing the quiz questions to generate the questions and answers
function generateQuizQuestions() {
    questionNumber++;
    correctAnswer = quizQuestions[questionNumber].correctAnswer

    questionHead.textContent = quizQuestions[questionNumber].question;
    correctOptions.innerHTML = "";

    var options = quizQuestions[questionNumber].options;

    for (var i = 0; i < options.length; i++) {
        var nextOption = document.createElement("button");

        nextOption.textContent = options[i]
        answerBtn = correctOptions.appendChild(nextOption).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// Enter initial to see the scoreboard screen
function displayScore() {
    document.getElementById("quiz-container").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + timeLeft + ".";
}

// Add event listener method for start quiz
startQuizBtn.addEventListener("click", startTimer);
submitQuizBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();

    window.location.href = './viewscores.html'
});
// This method add score and input user initial
function addScore() {
    userNameInput = document.getElementById("userName").value

    // Create a new object
    var newScore = {
        name: userNameInput,
        score: timeLeft
    };
    // First check scores in local storage (get item) if data there then convert string to object
    //if not, create a empty array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push object into score array
    highScores.push(newScore)
    // Covert object to string and put scores into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

}
//This method hide the results
function hideFeedback() {
    var pEl = document.getElementsByClassName("feedback")[0]
    pEl.style.display = 'none'
}
//This method show the results
function showFeedback() {
    var pEl = document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}
// This event checks the response to each answer 
correctOptions.addEventListener("click", function (event) {
    var pEl = document.getElementsByClassName("feedback")[0]
    if (correctAnswer === event.target.textContent) {
        pEl.innerHTML = "Correct answer!";
        setTimeout(hideFeedback, 1000);
        showFeedback();
        //Display the results if the answer is correct. 
    } else {
        pEl.innerHTML = "Sorry, wrong answer!!";
        setTimeout(hideFeedback, 1000);
        timeLeft = timeLeft - 10;
        showFeedback();
        //Display the results if the answer is wrong.
    }
    generateQuizQuestions();
});
//https://www.youtube.com/watch?v=riDzcEQbX6k
