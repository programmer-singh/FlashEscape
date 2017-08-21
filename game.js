LEVEL = 1;
CHANCES = 4;
function loadImages() {
    flashImage = new Image;
    flashImage.src = "assets/flash.png";
    
    enemies = ["revFlash" , "zoom" , "savitar"];
    enemyImages = [];
    for(var i = 0; i<enemies.length; i++) {
        enemyImage = new Image;
        enemyImage.src = "assets/" + enemies[i] + ".png";
        enemyImages.push(enemyImage);
    }
    
    goalImage = new Image;
    goalImage.src = "assets/portal.png";
    backgrounds = ["assets/level1.jpg", "assets/level2.jpg", "assets/level3.jpg"];
        if(LEVEL == 1) {
        alert("FLASH has been trapped in speed force dimensions by SAVITAR.\nSAVITAR has called REVERSE FLASH and ZOOM also, to stop FLASH getting out of the speed force.\nHelp FLASH getting out of the speed force by getting through three portals.");
    }
}
function init() {
    canvas = document.getElementById("gameCanvas");
    
    H = canvas.height;
    W = canvas.width;
    
    GAME_OVER = "false";
    
    pen = canvas.getContext('2d');
    pen.clearRect(0, 0, W, H);
    flash = {
        x : 5,
        y : H/2 - 75,
        h : 150,
        w : 100,
        speed : 0,
        state : "still"
    };
    
    enemies = [];
    
    enemy1 = {
      x : 200,
      y : 20,
      h : 150,
      w : 100,
      speed : 8,
      state : "moving"
    };
    
    if(LEVEL == 1) {
        enemy1.x = 600;
    }
    
    enemy2 = {
      x : 1000,
      y : 20,
      h : 150,
      w : 100,
      speed : 10,
      state : "moving"
    };
    enemy3 = {
      x : 600,
      y : 20,
      h : 150,
      w : 100,
      speed : 12,
      state : "moving"
    };
    enemies.push(enemy1);
    enemies.push(enemy2);
    enemies.push(enemy3);
    
    goal = {
      x : W-101,
      y : H/2 - 50,
      h : 100,
      w : 100,
      state : "still"
    };
    
    function keyPress(e) {
        if(e.key == "ArrowRight"){
                flash.speed = 10 ;  
            flash.state = "moving"
        }
        if(e.key == "ArrowLeft"){
                flash.speed = -10;   
            flash.state = "moving";
        }
    }
    function keyRelease(e) {
        flash.state = "still";
    }
    document.addEventListener("keydown",keyPress);
    document.addEventListener("keyup",keyRelease);
}

function draw() {
    pen.clearRect(0,0,W,H);
    pen.font = "20px Arial"
    pen.fillStyle = "WHITE";
    pen.fillText("LEVEL : " + LEVEL, 20,30);
    pen.fillText("LIVES : ", 150,30);
    var temp = 0;
    for (var i=0; i<CHANCES; i++){
        pen.drawImage(flashImage, 230+temp, 10, 20, 30);
        temp += 24;
        
    }
    pen.drawImage(flashImage, flash.x, flash.y, flash.w, flash.h);
    for(var i = 0; i<LEVEL; i++){
        pen.drawImage(enemyImages[i], enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
    }
    pen.drawImage(goalImage, goal.x, goal.y, goal.w, goal.h);
}

function isColliding(rect1, rect2) {
    var condition1 = Math.abs(rect1.x - rect2.x) <= rect1.w-10;
    var condition2 = Math.abs(rect1.y - rect2.y) <= rect1.h-10;
    return condition1 && condition2;
}

function update() {
    
    for(var i = 0; i<LEVEL; i++){
        if(isColliding(flash, enemies[i])) {
        GAME_OVER = "true";
            break;
        }
    }
    if(isColliding(flash, goal)) {
        GAME_OVER = "complete";
    }
    
    for(var i = 0; i<LEVEL; i++) {
        
        if(enemies[i].y <= 0 || enemies[i].y+enemies[i].h >= H){
            enemies[i].speed *= -1;
        }
        enemies[i].y += enemies[i].speed;
    }
    
    
    if(flash.state == "moving") {
        flash.x += flash.speed;
    }
}

function gameLoop() {
    draw();
    update();
    if(GAME_OVER == "false") {
        requestAnimationFrame(gameLoop);
    }else if(GAME_OVER == "true") {
        gameOver();
    }
    else if(GAME_OVER == "complete") {
        gameComplete();
    }
}

function gameOver() {
    if (CHANCES >0) {
        CHANCES--;
        playAgain();
    }else if (CHANCES == 0) {
        CHANCES = 4;
        LEVEL = 1;
        alert("!!!Game Over!!!\nYour enemy caught you.");
        playAgainCheck();
    }
}

function gameComplete() {
    alert("You reached the portal!");
    if(LEVEL < 3) {
        LEVEL++;
        playAgain();
    }else{
        LEVEL = 1;
        playAgainCheck();
    }
}

function playAgainCheck() {
    var again = confirm("Do you want to play again?");
    if(again == true) {
        playAgain();
    }
    else {
        alert("Hope You Enjoyed.");
    }
}

function playAgain() {
    init();
    canvas.style = "background: url('" + backgrounds[LEVEL-1] + "'); background-size: cover;";
    gameLoop();
}

loadImages();
playAgain();