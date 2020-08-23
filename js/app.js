const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the questions into availableQuestions Array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

// set question number, question and options
function getNewQuestion() {
  questionNumber.innerHTML =
    "Question " + (questionCounter + 1) + " of " + quiz.length;
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;

  const index1 = availableQuestions.indexOf(questionIndex);
  // Remove question from availableQuestions array to make sure there are no repeating questions
  availableQuestions.splice(index1, 1);

  const optionLen = currentQuestion.options.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";
  let animationDelay = 0.15;
  for (let i = 0; i < optionLen; i++) {
    //random option
    const optonIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // get the position of 'optonIndex' from the availableOptions
    const index2 = availableOptions.indexOf(optonIndex);
    //remove the opton 'optonIndex' from the availableOptions, so that it does not repeat
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}
// get the result of current click attempt question
function getResult(element) {
  const id = parseInt(element.id);
  // get the answer by comparing the id of clicked option
  if (id === currentQuestion.answer) {
    // set the green color to the correct option
    element.classList.add("correct");
    // add the indicator to correct mark
    updateAnswerIndicator("correct");
    correctAnswers++;
    console.log("correct:" + correctAnswers);
  } else {
    //set the red color to the incorrect option
    element.classList.add("wrong");
    // add the indicator to incorrect mark
    updateAnswerIndicator("wrong");
    //if the answer is incorrect, show the correct option in green
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}
// make all the options unclickable once the user selects an option (RESTRICT THE USER TO CHANGE THE OPTION)
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}
function answersIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}
function updateAnswerIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}
function next() {
  if (questionCounter === quiz.length) {
    console.log("quiz over");
    quizOver();
  } else {
    getNewQuestion();
  }
}
function quizOver() {
  //hide quiz quizBox
  quizBox.classList.add("hide");
  //show resultBox
  resultBox.classList.remove("hide");
  quizResult();
}
//get the result
function quizResult() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML =
    percentage.toFixed(2) + "%";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswers + "/" + quiz.length;
}
function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}
function tryAgainQuiz() {
  //hide the resultBox
  resultBox.classList.add("hide");
  //show the quizBox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

// ### STARTING POINT ###
function startQuiz() {
  //hide homebox
  homeBox.classList.add("hide");
  //show quizbox
  quizBox.classList.remove("hide");
  // first set all questions in availableQuestions Array
  setAvailableQuestions();
  // second call getNewQuestion(); function
  getNewQuestion();
  //to create indicators of answers
  answersIndicator();
}
