// Object for Quiz questions 
//https: www.youtube.com/watch?v=49pYIMygIcU
var quizQuestions = [
    {
        question: " Q 1: What is the correct syntax for referring to an external script called 'xxx.js'?",
        options: ["<script rel='xxx.js'>", "<script href='xxx.js'>", "<script link='xxx.js'>", "<script src='xxx.js'>"],
        correctAnswer: "<script src='xxx.js'>"
    },
    {
        question: "Q 2: What is the correct HTML for referring to an external style sheet?",
        options: ["<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<stylesheet>mystyle.css</stylesheet>", "<style src='mystyle.css'>", "<link alt='stylesheet' type='text/css' href='mystyle.css'>"],
        correctAnswer: "<link rel='stylesheet' type='text/css' href='mystyle.css'>"
    },
    {
        question: "Q 3: How does a FOR loop start?",
        options: ["for (i=0){}", "for(i<=5; i++) {}", "for(var i=0; i<=5; i++) {}", "for(i<=5; i++) {}"],
        correctAnswer: "for(var i=0; i<=5; i++) {}"
    },
    {
        question: "Q 4: How do you declare a JavaScript variable?",
        options: ["var fruitName;", "int fruitName;", "String fruitName;", "variable fruitName;"],
        correctAnswer: "var fruitName;"
    },
    {
        question: "Q 5: Which character is used to indicate an end tag?",
        options: ["<", "/", "^", "!"],
        correctAnswer: "/"
    },
    {
        question: "Q 6: What will the following code return: Boolean(10 > 9)?",
        options: ["NaN", "true", "false", "int"],
        correctAnswer: "true"
    }
];