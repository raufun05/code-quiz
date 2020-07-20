// Identify inner HTML elements 
var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    // Show the scores list and create an object
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("score-list");

// Scores display with descending order
highScores.sort(function (a, b) {
    return b.score - a.score
})

// display the scores
for (var j = 0; j < highScores.length; j++) {
    var newList = document.createElement("li")
    newList.textContent = highScores[j].name + " - " + highScores[j].score
    scoreList.appendChild(newList)
}


// click buttons for start again and delete history
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function () {
    history.back();
});
