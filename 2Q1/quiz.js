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
        question : "It is used for hauling trash, manures, fertilizers, planting materials and other ",
        choiceA : "A) Wheelbarrow",
        choiceB : "B) Water Pail",
        choiceC : "C) Sprinkler ",
        choiceD : "D) Sprayers",
        correct : "A"

    },{
        question : "It is for hauling water, manure and fertilizers.",
        choiceA : "A) Sprinkler",
        choiceB : "B) Sprayers",
        choiceC : "C) Water Pail",
        choiceD : "D) Wheelbarrow",
        correct : "C"
    },{
        question : "It is used for watering seedlings and young plants.",
        choiceA : "A) Sprinkler",
        choiceB : "B) Sprayers",
        choiceC : "C) Water pail",
        choiceD : "D) Sickle",
        correct : "A"
      },{
        question : "A tool used for spraying insecticides, foliar fertilizers, fungicides and herbicides.",
        choiceA : "A) Sprinkler",
        choiceB : "B) Sprayers",
        choiceC : "C) Water Pail",
        choiceD : "D) Wheelbarrow",
        correct : "B"
      },{
        question : "A tool used for loosening the soil, digging out root crops and turning over the materials in a compost heap.",
        choiceA : "A) Fork spading",
        choiceB : "B) Spading fork",
        choiceC : "C) Round fork",
        choiceD : "D) Fork",
        correct : "B"
      },{
        question : "A tool used for removing trash or soil, digging canals or ditches and mixing soil media.",
        choiceA : "A) Fork spading",
        choiceB : "B) Spading fork",
        choiceC : "C) Spade",
        choiceD : "D) Sickle",
        correct : "C"
      },{
        question : "A tool with a variously curved blade typically used for cutting weeds.",
        choiceA : "A) Fork spading",
        choiceB : "B) Spading fork",
        choiceC : "C) Spade",
        choiceD : "D) Sickle",
        correct : "D"
      },{
        question : "A tool used for cleaning the ground and leveling the topsoil.",
        choiceA : "A) Fork spading",
        choiceB : "B) Rake ",
        choiceC : "C) Spade",
        choiceD : "D) Sickle",
        correct : "B"
      },{
        question : "A tool used for cutting branches of planting materials and unnecessary branches of plants.",
        choiceA : "A) Scissors",
        choiceB : "B) Knife ",
        choiceC : "C) Pruning Shears ",
        choiceD : "D) Cutter",
        correct : "C"
      },{
        question : "A tool used for digging canals, breaking hard topsoil and for digging up stones and tree stumps.",
        choiceA : "A) Scissors",
        choiceB : "B) Knife ",
        choiceC : "C) Pruning Shears",
        choiceD : "D) Pick-mattock",
        correct : "D"
      },{
        question : "A tool used for digging canals, breaking hard topsoil and for digging up stones and tree stumps.",
        choiceA : "A) Light Hoe",
        choiceB : "B) Spading fork ",
        choiceC : "C) Spade",
        choiceD : "D) Sickle",
        correct : "A"
      },{
        question : "A tool used for cutting planting materials and for performing other operations in horticulture.",
        choiceA : "A) Scissors",
        choiceB : "B) Knife ",
        choiceC : "C) Pruning Shears",
        choiceD : "D) Cutter",
        correct : "B"
      },{
        question : "A tool used for loosening the soil around the growing plants and putting small amounts of manure fertilizer in the soil.",
        choiceA : "A) Fork spading",
        choiceB : "B) Rake  ",
        choiceC : "C) Spade",
        choiceD : "D) Hand Trowel",
        correct : "D"
      },{
        question : "A tool used inter row cultivation",
        choiceA : "A) Hand cultivator",
        choiceB : "B) Knife ",
        choiceC : "C) Hand Fork",
        choiceD : "D) Pick-mattock",
        correct : "C"
      },{
        question : "A tool used for cultivating the garden plot by loosening the soil and removing weeds around the plant.",
        choiceA : "A) Hand cultivator",
        choiceB : "B) Knife ",
        choiceC : "C) Pruning Shears",
        choiceD : "D) Pick-mattock",
        correct : "A"
      },{
        question : "A tool used for breaking hard topsoil and pulverizing soil.",
        choiceA : "A) Bolo",
        choiceB : "B) Crowbar",
        choiceC : "C) Axe",
        choiceD : "D) Grab-hoe",
        correct : "D"
      },{
        question : "A tool used for digging big holes and for digging out big stones and stumps.",
        choiceA : "A) Bolo",
        choiceB : "B) Crowbar",
        choiceC : "C) Axe",
        choiceD : "D) Grab-hoe",
        correct : "B"
      },{
        question : "A tool used for cutting tall grasses and weeds and chopping branches of trees.",
        choiceA : "A) Bolo",
        choiceB : "B) Crowbar",
        choiceC : "C) Axe",
        choiceD : "D) Grab-hoe",
        correct : "A"
      },{
        question : "A tool used for cutting bigger size post.",
        choiceA : "A) Bolo",
        choiceB : "B) Crowbar",
        choiceC : "C) Axe",
        choiceD : "D) Grab-hoe",
        correct : "C"
      },{
        question : "They are being used in performing farm activities which involve small areas like school gardens and home gardens.",
        choiceA : "A) Gloves",
        choiceB : "B) Equipment ",
        choiceC : "C) Tools",
        choiceD : "D) Plants",
        correct : "C"
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