var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (quizQuestions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;


function startTimer() {
    // swap welcome msg w/ questions
    document.getElementById("main").classList.add('d-none');
    document.getElementById("Q-ACode").classList.remove('d-none');

    // timer set and begins 90s countdown
    setTimer();
    // create questions to display
    generateQuizQuestions();
}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === quizQuestions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function generateQuizQuestions() {
    questionNumber++;
    answer = quizQuestions[questionNumber].answer

    questionHead.textContent = quizQuestions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = quizQuestions[questionNumber].choices;

    for (var i = 0; i < choices.length; i++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[i]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// Enter initial to see the scoreboard screen
function displayScore() {
    document.getElementById("Q-ACode").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
}

// Add event listener method for start button
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './viewscores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // create a new object with name and score keys
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // check if there are scores in local storage first(get it)
    //if not, make a new/blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push object into score array
    highScores.push(newScore)
    // turn objects into an array of strings then put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

}

function hideFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.style.display='none'
}

function showFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("feedback")[0]
    
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {   
        pEl.innerHTML = "Correct answer!";
        setTimeout(hideFeedback,1000);
        showFeedback();   
    } else {
        pEl.innerHTML = "Sorry, that's wrong answer.";
        setTimeout(hideFeedback,1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }    
    generateQuizQuestions();
});
