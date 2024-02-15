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
        question : "Crops are divided into categories and they’re as follows: ",
        choiceA : "A) Food Crops",
        choiceB : "B) Ornamental Crops",
        choiceC : "C) Rice Crops",
        choiceD : "D) Industrial Crops  ",
        correct : "C"

    },{
        question : "Examples are wheat, rice, corn, sugarcane and other forage crops.",
        choiceA : "A) Field crop",
        choiceB : "B) Industrial Crops",
        choiceC : "C) Rice crops",
        choiceD : "D) Oil Crops",
        correct : "A"
    },{
        question : "Crop that is cultured for their biological materials which are used in industrial processes into nonedible products.(Example: Tobacco)",
        choiceA : "A) Field crop",
        choiceB : "B) Industrial Crops",
        choiceC : "C) Rice crops",
        choiceD : "D) Oil Crops",
        correct : "B"
      },{
        question : "A plant that is primarily raised, cultured and harvested for human consumption. It has two sub categories, the field crops and root crops.",
        choiceA : "A) Food Crops",
        choiceB : "B) Ornamental Crops",
        choiceC : "C) Rice Crops",
        choiceD : "D) Industrial Crops ",
        correct : "A"
      },{
        question : "It is woody climbing or twining plants which depend on other plants for vertical support to climb up to the tree.",
        choiceA : "A) lianas",
        choiceB : "B) Shrubs",
        choiceC : "C) evergreen",
        choiceD : "D) trees",
        correct : "A"
      },{
        question : "These are the plants that maintain their leaves throughout the year.",
        choiceA : "A) lianas",
        choiceB : "B) Shrubs",
        choiceC : "C) evergreen",
        choiceD : "D) trees",
        correct : "C"
      },{
        question : "These are the  plants having erect and continuous growth with a large development of woody tissue, with a single distinct stem or trunk.",
        choiceA : "A) lianas",
        choiceB : "B) Shrubs",
        choiceC : "C) evergreen",
        choiceD : "D) trees",
        correct : "D"
      },{
        question : "Crop that takes two years to complete its biological life cycle. Its examples are cabbage, parsley and others.",
        choiceA : "A) Biennial crop",
        choiceB : "B) Oil crop",
        choiceC : "C) Perennial crop",
        choiceD : "D) Field crop",
        correct : "A"
      },{
        question : "This crop are plant that lives more than two years",
        choiceA : "A) Biennial crop",
        choiceB : "B) Oil crop",
        choiceC : "C) Perennial crop",
        choiceD : "D) Field crop",
        correct : "C"
      },{
        question : "These are the plants which naturally shed off or lose leaves annually for extended periods.",
        choiceA : "A) lianas",
        choiceB : "B) evergreen",
        choiceC : "C) deciduous",
        choiceD : "D) trees",
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