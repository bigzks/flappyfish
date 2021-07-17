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

let diving = false;
// animate and control
function animate() {
    
    const fish = window.document.getElementById("fish");
    const topBarrier = window.document.getElementsByClassName("topBarrier");
    const botBarrier = window.document.getElementsByClassName("botBarrier");
    var speed = 5;
    var fishPos;
    
    // fish animate
    fishPos = parseInt((window.getComputedStyle(fish).getPropertyValue("top")).slice(0, -2));
    fishFloat = fishPos - speed;

    window.onkeypress = e => diving = true;

    if (diving == true){
        const dive = window.setInterval(function(){
            fishFloat = fishFloat + 10;
            fish.style.top = (fishFloat + "px");
        }, 10)
        setTimeout( () => {
            clearInterval(dive)
            diving = false    
        }, 60)
    }
    else {
        fish.style.top = (fishFloat + "px");
    }

    for (let i = 0; topBarrier.length; i++){
        // animate top barrier
        topBarrierPos = parseInt((window.getComputedStyle(topBarrier[i]).getPropertyValue("left")).slice(0, -2));
        topBarrierMove = topBarrierPos - speed;
        topBarrier[i].style.left = (topBarrierMove + "px");


        // animate bot barrier
        botBarrierPos = parseInt((window.getComputedStyle(botBarrier[i]).getPropertyValue("left")).slice(0, -2));
        botBarrierMove = botBarrierPos - speed;
        botBarrier[i].style.left = (botBarrierMove + "px");

        // delete bot and top barrier
        if (topBarrierPos <= -110){
            document.getElementById('barriers').removeChild(botBarrier[i]);
            document.getElementById('barriers').removeChild(topBarrier[i]);
        }
    }
}

function colision(){
    const topBarrier = document.getElementsByClassName("topBarrier");
    const botBarrier = document.getElementsByClassName("botBarrier");
    const fish = window.document.getElementById("fish");

    var topBarrierTopPos = parseInt(window.getComputedStyle(topBarrier[0]).top.slice(0, -2));
    var topBarrierLeftPos = parseInt(window.getComputedStyle(topBarrier[0]).left.slice(0, -2));
    

    var botBarrierBotPos = parseInt(window.getComputedStyle(botBarrier[0]).bottom.slice(0, -2));
    var botBarrierLeftPos = parseInt(window.getComputedStyle(botBarrier[0]).left.slice(0, -2));

    var topBarrierHeight = parseInt(window.getComputedStyle(topBarrier[0]).height.slice(0, -2));
    var botBarrierHeight = parseInt(window.getComputedStyle(botBarrier[0]).height.slice(0, -2));
    const barrierWidth = 136;
    const fishWidth = 101;
    const fishHeight = 76;

    var fishLeftPos = parseInt(window.getComputedStyle(fish).left.slice(0, -2));
    var fishTopPos = parseInt(window.getComputedStyle(fish).top.slice(0, -2));
    var fishBotPos = parseInt(window.getComputedStyle(fish).bottom.slice(0, -2));

    // checking colisiont with the floor and the ceiling
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
}

function game(){
    const progressText = parseInt(document.getElementById('points'));

    if ((tick % 100) == 0){
        generateBarrier();
    }
    tick += 1;

    // an inexistant error was being spammed, so ill let this try catch statement till i came up with smt
    try{
        animate();
    }
    catch{}

    // gameover
    if (colision() == 2){
        clearInterval(timer);
    }
    // gamepoint
    else if (colision() == 1){
        if (((tick % 50) == 0) && (tick > 200)){
            progress();
        }
    }
}

// game loop
var tick = 1;
const timer = setInterval(game, 30);