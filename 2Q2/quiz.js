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
        question : "They are used in land preparation and in transporting farm inputs and products.",
        choiceA : "A) Tools",
        choiceB : "B) Equipment",
        choiceC : "C) Machines ",
        choiceD : "D) Truck",
        correct : "B"

    },{
        question : "An equipment used to remove the husk and the bran layers, and produce an edible white rice.",
        choiceA : "A) Rice Seeder",
        choiceB : "B) Miller",
        choiceC : "C) Grass Cutter",
        choiceD : "D) Rice Harvester",
        correct : "B"
    },{
        question : "An equipment used for sowing germinated paddy seed directly in a wetland field.",
        choiceA : "A) Rice Seeder",
        choiceB : "B) Miller",
        choiceC : "C) Grass Cutter",
        choiceD : "D) Rice Harvester",
        correct : "A"
      },{
        question : "A device used to cut the grass, as a lawn mower.  ",
        choiceA : "A) Rice Seeder",
        choiceB : "B) Miller",
        choiceC : "C) Grass Cutter",
        choiceD : "D) Rice Harvester",
        correct : "C"
      },{
        question : "This equipment makes the harvesting process easier by combining six operations such as gathering, transporting, reaping, threshing, cleaning and bagging into one machine.",
        choiceA : "A) Rice Seeder",
        choiceB : "B) Miller",
        choiceC : "C) Grass Cutter",
        choiceD : "D) Rice Harvester",
        correct : "D"
      },{
        question : "This machine used to peel the skin of corn and make maize removed from the cob.",
        choiceA : "A) Corn Dehusker",
        choiceB : "B) Machines",
        choiceC : "C) Thresher",
        choiceD : "D) Water Pump",
        correct : "A"
      },{
        question : "A farm equipment that threshers grain, that is, it removes the seeds from the stalks.",
        choiceA : "A) Corn Dehusker",
        choiceB : "B) Machines",
        choiceC : "C) Thresher",
        choiceD : "D) Water Pump",
        correct : "C"
      },{
        question : "This equipment is being used to draw irrigation water from a source.",
        choiceA : "A) Corn Dehusker",
        choiceB : "B) Machines",
        choiceC : "C) Thresher",
        choiceD : "D) Water Pump",
        correct : "D"
      },{
        question : "This equipment is being used to pull a disc plow and disc harrow in preparation for a much bigger area of land.",
        choiceA : "A) Hand Tractor",
        choiceB : "B) Four Wheel Tractor",
        choiceC : "C) Machines",
        choiceD : "D) Truck",
        correct : "B"
      },{
        question : "This equipment is being used to pull a plow and harrow in preparing a large area of land.",
        choiceA : "A) Hand Tractor",
        choiceB : "B) Four Wheel Tractor",
        choiceC : "C) Machines",
        choiceD : "D) Truck",
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