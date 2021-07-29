function generateBarrier() {

    const barriers = document.getElementById('barriers')
    
    // creating top barrier div
    const topBarrier = document.createElement('div');
    topBarrier.className = "topBarrier";

    // creating top barrier body
    const topBarrierBody = document.createElement('div');
    topBarrierBody.className = "topBarrierBody";
    

    // creating top barrier tip
    const topBarrierHead = document.createElement('div');
    topBarrierHead.className = "topBarrierTip";
    

    // creating bot barrier div
    const botBarrier = document.createElement('div');
    botBarrier.className = "botBarrier";

    // creating bot barrier body
    const botBarrierBody = document.createElement('div');
    botBarrierBody.className = "botBarrierBody";

    // creating bot barrier tip
    const botBarrierHead = document.createElement('div');
    botBarrierHead.className = "botBarrierTip";

    
    // body style
    var bodyHeight = (Math.floor(Math.random() * 300) + 50);
    botBarrierBody.style.height = (bodyHeight + 'px');
    topBarrierBody.style.height = ((350 - bodyHeight) + 'px');
    
    topBarrier.appendChild(topBarrierBody);
    topBarrier.appendChild(topBarrierHead);
    botBarrier.appendChild(botBarrierHead);
    botBarrier.appendChild(botBarrierBody);

    // adding both to html file
    barriers.appendChild(topBarrier);
    barriers.appendChild(botBarrier);
}

// animate and control
let diving = false;
function animate() {    
    const fish = window.document.getElementById("fish");
    const topBarrier = window.document.getElementsByClassName("topBarrier");
    const botBarrier = window.document.getElementsByClassName("botBarrier");
    const speed = 5;
    let fishPos;

    // fish animate
    fishPos = parseInt((window.getComputedStyle(fish).getPropertyValue("top")).slice(0, -2));
    fishFloat = fishPos - speed;

    window.onkeypress = e => {
        const jumpSound = new Audio("/misc/sounds/jump.mp3");
        jumpSound.addEventListener("canplay", jumpSound.play);

        diving = true;
    }

    // onkeypress
    if (diving == true){
        const dive = window.setInterval(function(){
            fishFloat = fishFloat + 10;
            fish.style.top = (fishFloat + "px");
        }, 10)
        setTimeout( () => {
            clearInterval(dive);
            diving = false;
        }, 60);
    }
    // animation without interruption
    else {
        fish.style.top = (fishFloat + "px");
    }


    for (let i = 0; i < topBarrier.length; i++){
        const leftLimit = -110; 

        // animate top barrier
        topBarrierPos = parseInt(window.getComputedStyle(botBarrier[i]).left.slice(0, -2));
        topBarrierMove = topBarrierPos - speed;
        topBarrier[i].style.left = (topBarrierMove + "px");


        // animate bot barrier
        botBarrierPos = parseInt((window.getComputedStyle(botBarrier[i]).getPropertyValue("left")).slice(0, -2));
        botBarrierMove = botBarrierPos - speed;
        botBarrier[i].style.left = (botBarrierMove + "px");

        
        if (topBarrierPos <= leftLimit){
            // delete bot and top barrier
            document.getElementById('barriers').removeChild(botBarrier[i]);
            document.getElementById('barriers').removeChild(topBarrier[i])
            
            // extra left move to make sure it's not gonna stutter
            topBarrierPos = parseInt(window.getComputedStyle(topBarrier[0]).left.slice(0, -2));
            topBarrierMove = topBarrierPos - speed;
            topBarrier[0].style.left = (topBarrierMove + "px"); 
            botBarrierPos = parseInt((window.getComputedStyle(botBarrier[0]).getPropertyValue("left")).slice(0, -2));
            botBarrierMove = botBarrierPos - speed;
            botBarrier[0].style.left = (botBarrierMove + "px");
        }
    }
}

function colision(){
    const topBarrier = document.getElementsByClassName("topBarrier");
    const botBarrier = document.getElementsByClassName("botBarrier");
    const fish = window.document.getElementById("fish");

    let topBarrierTopPos = parseInt(window.getComputedStyle(topBarrier[0]).top.slice(0, -2));
    let topBarrierLeftPos = parseInt(window.getComputedStyle(topBarrier[0]).left.slice(0, -2));
    let topBarrierHeight = parseInt(window.getComputedStyle(topBarrier[0]).height.slice(0, -2));

    let botBarrierBotPos = parseInt(window.getComputedStyle(botBarrier[0]).bottom.slice(0, -2));
    let botBarrierLeftPos = parseInt(window.getComputedStyle(botBarrier[0]).left.slice(0, -2));
    let botBarrierHeight = parseInt(window.getComputedStyle(botBarrier[0]).height.slice(0, -2));
    
    
    const barrierWidth = 136;
    const fishWidth = 101;

    let fishLeftPos = parseInt(window.getComputedStyle(fish).left.slice(0, -2));
    let fishTopPos = parseInt(window.getComputedStyle(fish).top.slice(0, -2));
    let fishBotPos = parseInt(window.getComputedStyle(fish).bottom.slice(0, -2));

    // checking colision with the floor and the ceiling
    if ((fishBotPos <= 0) || (fishTopPos <= 0)){
        return 2;
    }

    // checking colision with the top barrier
    if(((topBarrierTopPos + topBarrierHeight) > fishTopPos) && ((topBarrierLeftPos + barrierWidth) > fishLeftPos) && ((fishLeftPos + fishWidth) > topBarrierLeftPos)){
        return 2;

    }

    // checking colision with the bottom barrier
    else if(((botBarrierBotPos + botBarrierHeight) > fishBotPos) && ((botBarrierLeftPos + barrierWidth) > fishLeftPos) && ((fishLeftPos + fishWidth) > botBarrierLeftPos)){
        return 2;
    }

    // checking successfull pass
    else if(((botBarrierLeftPos + (barrierWidth * 1.5) ) > fishLeftPos)){   
        return 1;
    }

    // nothing happen
    else{
        return 0;
    }
}
function progress(){
    const spanProgress = document.getElementById('points');
    var progress = parseInt(spanProgress.innerText);
    spanProgress.innerText = (progress + 1);

    const successSound = new Audio("/misc/sounds/success.mp3");
    successSound.addEventListener("canplay", successSound.play);
}

function game(){
    if ((tick % 100) == 0){
        generateBarrier();
    }
    
    animate();

    switch(colision()){
        case 1: // gamepoint
            if (((tick % 50) == 0) && (tick > 200)){
                progress();
            }
            break;

        case 2: // gameover
            // const pointsSpan = document.getElementById("points");
            // const score = Number(pointsSpan.innerText);

            clearInterval(timer);

            // highscore
            // if (localStorage.highscore){
            //    if (localStorage.highscore < score){
            //        localStorage.highscore = score;
            //    }
            // } 
            // else{
            //    localStorage.highscore = score;
            // }
            // window.location.reload(false);
            // console.log(localStorage.highscore);
            // break;      
    }
    tick += 1;
}

// game loop
var tick = 1;
const timer = setInterval(game, 30);