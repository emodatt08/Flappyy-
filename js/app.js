//Declare all variables
var cvs = document.getElementById('canvas');
//Get context(whether a 2d or 3d project)
var ctx = cvs.getContext("2d");

//Load all image assets in variables
var bird = new Image();
bird.src="./assets/images/bird.png";
var bg = new Image();
bg.src="./assets/images/bg.png";
var fg = new Image();
fg.src="./assets/images/fg.png";
var pipeNorth = new Image();
pipeNorth.src="./assets/images/pipeNorth.png";
var pipeSouth = new Image();
pipeSouth.src="./assets/images/pipeSouth.png";

//Load all audio assets in variables
var fly = new Audio();
fly.src="./assets/sounds/fly.mp3";
var scoreSound = new Audio();
scoreSound.src="./assets/sounds/score.mp3";

//-----IMPORTANT VARIABLES
var gap = 325;

//set the bird's position to the x and y axis
var by = 150;
var bx = 10;

//set gravity
var gravity = 1.5;
//set score sheet
var score = 0;
//set
var constant = pipeNorth.height+gap; 
//Set on key down
document.addEventListener('keydown', moveUp);
function moveUp(){
    by -= 35;
    //play fly sound
    fly.play();
}

//set pipe coordinates
var pipe = [];
pipe[0] = {
    x : "232",
    y : 0
}

//draw the images
window.onload = function() {
 function draw(){
    ctx.drawImage(bg, 0,0);
   
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;

        if( pipe[i].x == '35'){
            pipe.push({
                x : "232",
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }
        //detect collision
        // if( bx + bird.width >= pipe[i].x && bx <=pipe[i].x + pipeNorth.width 
        //     && (by <= pipe[i].y + pipeNorth.height || by.height >= pipe[i].y+constant || by + bird.height >= cvs.height-fg.height )){
        //     location.reload();//reload page
        // }

        if( bx + bird.width >= pipe[i].x && bx <=pipe[i].x + pipeNorth.width 
            && (by <= pipe[i].y + pipeNorth.height || by.height >= pipe[i].y+constant || by + bird.height >= cvs.height-fg.height )){
            location.reload();//reload page
        }

        if(pipe[i].x == 5){
            score++;
            scoreSound.play();
        }

    }

    ctx.drawImage(bird, bx,by);
    ctx.drawImage(fg, 0,cvs.height-fg.height,"288","130");
    //set bird's gravity
    by += gravity;
    //set score card
    ctx.fillStyle = "#000";
    ctx.font ="20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height-20)
    requestAnimationFrame(draw);
}

draw();
}