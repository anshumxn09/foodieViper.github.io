let myDirection = {x:0, y:0};
let prevFrameTime = 0;
let speed = 4;
let snakeBody = [{x:6, y:5}];
let food = {x:13, y:15};
let score = 0;
const scoreBoard =  document.querySelector('.score');
const highBoard = document.querySelector('.highscore');

function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime - prevFrameTime)/1000 < 1/speed){
        return;
    }
    prevFrameTime = ctime;
    mainGame();
}

function isCollide(snakeBody){

    for(let i=1; i<snakeBody.length; i++){
        if(snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y){
            return true;
        }
    }
    if (snakeBody[0].x >= 18 || snakeBody[0].x <= 0 || snakeBody[0].y >= 18 || snakeBody[0].y <= 0 ){
        return true;
    }
    return false;
}

function mainGame(){
    
    if(isCollide(snakeBody)){
        myDirection = {x: 0, y: 0};
        snakeBody = [{x:6, y:5}];
        food = {x:13, y:15};
        score=0;
        scoreBoard.innerHTML = "Score : "+score;
    }

    if ((snakeBody[0].x === food.x) && (snakeBody[0].y === food.y)){
        score++;
        scoreBoard.innerHTML = "Score : "+score;
        if(score > highscor){
            highscor = score;
            localStorage.setItem('highvalue', JSON.stringify(highscor));
            highBoard.innerHTML = "High Score : "+highscor;
        }
        snakeBody.unshift({x:snakeBody[0].x + myDirection.x, y: snakeBody[0].y + myDirection.y})
        let a = 2;
        let b = 15;
        food = {x : Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    for(let i=snakeBody.length-2; i>=0; i--){
        snakeBody[i+1] = {...snakeBody[i]};
    }

    snakeBody[0].x += myDirection.x;
    snakeBody[0].y += myDirection.y;

    playboard.innerHTML = "";
    snakeBody.forEach((element, index) => {
        bodyCompo = document.createElement('div');
        bodyCompo.style.gridRowStart = element.y;
        bodyCompo.style.gridColumnStart = element.x;

        if (index === 0){
            bodyCompo.classList.add('head');
        }
        else{
            bodyCompo.classList.add('snake');
        }
        playboard.appendChild(bodyCompo);
    })

    foodBowl = document.createElement('div');
    foodBowl.style.gridRowStart = food.y;
    foodBowl.style.gridColumnStart = food.x;
    foodBowl.classList.add('food');
    playboard.appendChild(foodBowl);
}

let highscor = localStorage.getItem('highvalue');
if (highscor === 0){
    highscor = 0;
    highBoard.innerHTML = "High Score : "+highscor;
}
else{
    highBoard.innerHTML = "High Score : "+highscor;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            myDirection.x = 0;
            myDirection.y = -1;
            break;
        
        case 'ArrowDown':
            myDirection.x = 0;
            myDirection.y = 1;
            break;
        
        case 'ArrowLeft':
            myDirection.x = -1;
            myDirection.y = 0;
            break;

        case 'ArrowRight':
            myDirection.x = 1;
            myDirection.y = 0;
            break;

        default:
            break;
    }
});