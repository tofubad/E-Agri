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
        question : "A proper tool for digging.",
        choiceA : "A) Bolo   ",
        choiceB : "B) Crowbar  ",
        choiceC : "C) Grub hoe ",
        choiceD : "D) Pruning shear",
        correct : "C"

    },{
        question : "A proper tool for cutting grasses",
        choiceA : "A) Shovel ",
        choiceB : "B) Bolo ",
        choiceC : "C) Crowbar ",
        choiceD : "D) Mattock ",
        correct : "B"
    },{
        question : "Which tool does not belong to the group according to its use as?",
        choiceA : "A) Crowbar ",
        choiceB : "B) Pruning shear ",
        choiceC : "C) Mattock ",
        choiceD : "D) Shovel ",
        correct : "B"
      },{
        question : "Farm tools are very important in agricultural crop production because  they __________. ",
        choiceA : "A) Make work faster ",
        choiceB : "B) Male work easier ",
        choiceC : "C) Save time and effort  ",
        choiceD : "D) All of the above  ",
        correct : "D"
      },{
        question : "A farm tool used for cleaning the ground and levelling the topsoil.",
        choiceA : "A) Shovel ",
        choiceB : "B) Pick-Mattock  ",
        choiceC : "C) Rake ",
        choiceD : "D) Spade  ",
        correct : "C"
      },{
        question:  "A farm tool that looks like a spoon primarily used for transferring the  soil. ",
        choiceA : "A) Spade ",
        choiceB : "B) Shovel  ",
        choiceC : "C) Rake",
        choiceD : "D) Wheel barrow ",
        correct : "B"
      },{
        question:  "An open container with a single pair of wheels at the front and two  handles at the rear used for transport materials to another place.",
        choiceA : "A) Trailer ",
        choiceB : "B) Hand tractor  ",
        choiceC : "C) Wheel barrow",
        choiceD : "D) Improvised Basket ",
        correct : "C"
      },{
        question:  "It is an implement which is pulled by a working animal to till the soil.  ",
        choiceA : "A) Disc harrow  ",
        choiceB : "B) Disc plow  ",
        choiceC : "C) Native plow",
        choiceD : "D) Native harrow ",
        correct : "D"
      },{
        question:  "It is an implement mounted to a tractor that is used to pulverize the  newly plowed soil.  ",
        choiceA : "A) Disc harrow  ",
        choiceB : "B) Disc plow ",
        choiceC : "C) Native plow ",
        choiceD : "D) Native harrow  ",
        correct : "A"
      },{
        question:  "A farm tool primarily used to operate horticultural works.",
        choiceA : "A) Pruning shear  ",
        choiceB : "B) Knife ",
        choiceC : "C) Cutter ",
        choiceD : "D) Harvester  ",
        correct : "B"
    },{
        question:  "Which of the following farming is used for digging canals, breaking  hard topsoil and for digging up stones and tree stumps?  ",
        choiceA : "A) Shovel ",
        choiceB : "B) Spade ",
        choiceC : "C) Hoe ",
        choiceD : "D) Pick-mattock ",
        correct : "D"
    },{
        question:  "It is a tool used without the help of animals or machines. Being used in  performing farm activities which involve small areas like school garden  and home garden.  ",
        choiceA : "A) Shovel ",
        choiceB : "B) Hand tools",
        choiceC : "C) Grass cutter ",
        choiceD : "D) Grab hoe ",
        correct : "B"
    },{
        question:  "It is a tool used for cleaning the ground and leveling the topsoil.",
        choiceA : "A) Sickle ",
        choiceB : "B) Spade ",
        choiceC : "C) Prunning shears  ",
        choiceD : "D) Rake   ",
        correct : "D"
    },{
        question:  "Which of the following are the accessories which are being pulled by  working animals or mounted to machinery usually used in the  preparation of land. Usually made of a special kind of metal. ",
        choiceA : "A) Farm tools ",
        choiceB : "B) Farm equipments  ",
        choiceC : "C) Farm implements ",
        choiceD : "D) None of the Above  ",
        correct : "C"
    },{
        question:  "Which of the following is equipment used in land preparation and in  transporting farm inputs and products? This equipment needs a highly  skilled operator to use. ",
        choiceA : "A) Farm tools ",
        choiceB : "B) Farm implements ",
        choiceC : "C) Farm equipments ",
        choiceD : "D) All of the above  ",
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