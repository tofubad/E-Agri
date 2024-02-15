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
        question : "It is the branch of agriculture concerned with animals that are raised for meat, fiber, milk, eggs, or other products. ",
        choiceA : "A) fishery",
        choiceB : "B) agriculture",
        choiceC : "C) animal Husbandry",
        choiceD : "D) agri-fishery",
        correct : "C"

    },{
        question : "Below are the main branches of agriculture EXCEPT ONE.",
        choiceA : "A) farming",
        choiceB : "B) Livestock Production or Animal Husbandry.",
        choiceC : "C) Crop Production or Agronomy.",
        choiceD : "D) Agricultural Economics",
        correct : "A"
    },{
        question : "It refers to the science and art of growing and caring for plants, especially flowers, fruits, and vegetables.",
        choiceA : "A) olericulture",
        choiceB : "B) pomology",
        choiceC : "C) horticulture",
        choiceD : "D) floriculture",
        correct : "C"
      },{
        question : "It refers to the raising of birds either domestically or commercially,  primarily for meat and eggs including feathers.  ",
        choiceA : "A) swine raising ",
        choiceB : "B) bird culture",
        choiceC : "C) poultry farming",
        choiceD : "D) zoology ",
        correct : "C"
      },{
        question : "_________ is the cultivation of fruit crops.  ",
        choiceA : "A) floriculture ",
        choiceB : "B) fruiticulture ",
        choiceC : "C) pomology ",
        choiceD : "D) horticulture ",
        correct : "C"
      },{
        question : "It refers to farming, plant care, propagation, and cultivation",
        choiceA : "A) olericulture",
        choiceB : "B) pomology",
        choiceC : "C) horticulture",
        choiceD : "D) floriculture",
        correct : "D"
      },{
        question : "It is the science and art of vegetable growing, dealing with the culture of non-woody (herbaceous) plants for food.",
        choiceA : "A) olericulture",
        choiceB : "B) pomology",
        choiceC : "C) horticulture",
        choiceD : "D) floriculture",
        correct : "A"
      },{
        question : "It is the husbandry of grazing animals.",
        choiceA : "A) Nomadic Pastoralism",
        choiceB : "B) Poultry Farming",
        choiceC : "C) Swine Farming",
        choiceD : "D) Apiculture",
        correct : "A"
      },{
        question : "It is the scientific method of rearing honeybees.",
        choiceA : "A) Nomadic Pastoralism",
        choiceB : "B) Poultry Farming",
        choiceC : "C) Swine Farming",
        choiceD : "D) Apiculture",
        correct : "D"
      },{
        question : "It is the raising of birds domestically.",
        choiceA : "A) Nomadic Pastoralism",
        choiceB : "B) Poultry Farming",
        choiceC : "C) Swine Farming",
        choiceD : "D) Apiculture ",
        correct : "B"
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