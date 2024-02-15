// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "When did the first metal barbed fish hooks appear? ",
        choiceA : "A) Middle ages",
        choiceB : "B) Chinese dynasty",
        choiceC : "C) 16 years ago ",
        choiceD : "D) 12th dynasty",
        correct : "D"

    },{
        question : "It is the feeding of fish entirely from the food web within the pond, which may be enhanced by the addition of fertilizer or manure.",
        choiceA : "A) Fish Preservation  ",
        choiceB : "B) Extensive Fish Farming ",
        choiceC : "C) Fish Reservation  ",
        choiceD : "D) Semi-Intensive Fish Farming ",
        correct : "B"
    },{
        question : "It is a fish farming where the fish still obtain significant nutrition from the food web within their pond, but they are also given supplementary feed.",
        choiceA : "A) Fish Preservation  ",
        choiceB : "B) Extensive Fish Farming ",
        choiceC : "C) Fish Reservation  ",
        choiceD : "D) Semi-Intensive Fish Farming ",
        correct : "D"
      },{
        question : "What is the term for fish in the Philipinelocal?",
        choiceA : "A) fiskaz",
        choiceB : "B) peys/pisk ",
        choiceC : "C) isda ",
        choiceD : "D) fisch   ",
        correct : "C"
      },{
        question : "What is the term for fish in old English?",
        choiceA : "A) fiskaz ",
        choiceB : "B) peys/pisk ",
        choiceC : "C) isda",
        choiceD : "D) fisch  ",
        correct : "D"
      },{
        question:  "The human effort of raising the maximum productivity of fish and other fishery products to satisfy human needs is ______. ",
        choiceA : "A) Fish Culture",
        choiceB : "B) Fish Capture ",
        choiceC : "C) Fish Cultivation ",
        choiceD : "D) Fish Propagation ",
        correct : "A"
      },{
        question:  "It deals with the scientific method of catching fish. ",
        choiceA : "A) Fish Catching",
        choiceB : "B) Fish Capture  ",
        choiceC : "C) Fish Harvesting ",
        choiceC : "D) Fish Harvesting ",
        correct : "B"
      },{
        question:  "It deals with the scientific method of preserving fish and other aquatic products to prevent spoilage.   ",
        choiceA : "A) Fish Preservation  ",
        choiceB : "B) Fish Conservation  ",
        choiceC : "C) Fish Reservation ",
        choiceD : "D) Fish Protection  ",
        correct : "A"
      },{
        question:  "It is defined as a natural or artificial method of promoting or enhancing reproduction and survival of fish and other aquatic products.  ",
        choiceA : "A) Fish Cultivation  ",
        choiceB : "B) Fish Culture ",
        choiceC : "C) Fish Propagation  ",
        choiceD : "D) Fish Reproduction   ",
        correct : "C"
      },{
        question:  "It is the rearing of fish and other aquatic products from a very young stage like fry and fingerlings up to the marketable size. ",
        choiceA : "A) Fish Cultivation  ",
        choiceB : "B) Fish Culture ",
        choiceC : "C) Fish Propagation ",
        choiceD : "D) Fish Reproduction   ",
        correct : "A"
    }
    
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}