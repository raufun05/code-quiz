// Update/ Manipulate inner HTML of our elements
//<!--https: www.youtube.com/watch?v=49pYIMygIcU -->

var startQuizBtn = document.getElementById("startBtn");
var submitQuizBtn = document.querySelector("button.submitBtn")
var timeLeft = (quizQuestions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var questionHead = document.getElementById("questions");
var correctOptions = document.getElementById("answers");

var questionNumber = -1;
var correct;


function startTimer() {
    // swap welcome msg w/ questions
    document.getElementById("main").classList.add('d-none');
    document.getElementById("quiz-container").classList.remove('d-none');

    // timer set and begins 90s countdown
    setTimer();
    // create questions to display
    generateQuizQuestions();
}

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

// Add event listener method for start button
startQuizBtn.addEventListener("click", startTimer);
submitQuizBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './viewscores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // create a new object with name and score keys
var newScore = {
        name: userNameInput,
        score: timeLeft
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

correctOptions.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("feedback")[0]
    
    // evaluation of user's answer choices & feedback
    if (correctAnswer === event.target.textContent) {   
        pEl.innerHTML = "Correct answer!";
        setTimeout(hideFeedback,1000);
        showFeedback();   
    } else {
        pEl.innerHTML = "Sorry, wrong answer!!";
        setTimeout(hideFeedback,1000);
        timeLeft = timeLeft - 10;
        showFeedback();
    }    
    generateQuizQuestions();
});
