//Alias
var Container = PIXI.Container,
autoDetectRenderer = PIXI.autoDetectRenderer,
loader = PIXI.loader,
resources = PIXI.loader.resources,
Sprite = PIXI.Sprite,
Graphics = PIXI.Graphics;
Text = PIXI.Text;

//Criar um stage e um renderer do Pixi
var stage = new Container(),
renderer = autoDetectRenderer(512, 128);
document.body.appendChild(renderer.view);

var startX = 50;
var startY = 50;

var line = new Graphics();
line.lineStyle(1, 0xFFFFFF, 1);
line.moveTo(0, 0);
line.lineTo(256, 0);
line.x = startX;
line.color = "white";

var biggerBox = new Graphics();
biggerBox.beginFill(0xD00000);
biggerBox.drawRect(0, 0, 32, 64);
biggerBox.endFill();
biggerBox.x = 306;
biggerBox.y = startY-14;
biggerBox.color = "red";

var blueBox = new Graphics();
blueBox.beginFill(0x0000D0);
blueBox.drawRect(0, 0, 32, 32);
blueBox.endFill();
blueBox.x = 306;
blueBox.y = startY;
blueBox.color = "blue";

var resizeBox = new Graphics();
resizeBox.lineStyle(2, 0xFFFFFF, 1);
resizeBox.beginFill(0x000000);
resizeBox.drawRect(0, 0, 32, 32);
resizeBox.endFill();
resizeBox.x = startX+90;
resizeBox.y = startY;
resizeBox.color = "black";

var recolorBox = new Graphics();
recolorBox.lineStyle(2, 0xFFFFFF, 1);
recolorBox.beginFill(0x0000FF);
recolorBox.drawRect(0, 0, 32, 32);
recolorBox.endFill();
recolorBox.x = startX+90;
recolorBox.y = startY;
recolorBox.color = "black";

var resizeSmallBox = new Graphics();
resizeSmallBox.lineStyle(2, 0xFFFFFF, 1);
resizeSmallBox.beginFill(0x000000);
resizeSmallBox.drawRect(0, 0, 32, 32);
resizeSmallBox.endFill();
resizeSmallBox.x = startX+90;
resizeSmallBox.y = startY;
resizeSmallBox.color = "black";

var choiceBox = new Graphics();
choiceBox.lineStyle(2, 0xFFFFFF, 1);
choiceBox.beginFill(0x000000);
choiceBox.drawRect(0, 0, 32, 32);
choiceBox.endFill();
choiceBox.x = startX+120;
choiceBox.y = startY;
choiceBox.type = 0;
choiceBox.color = "black";

var playerBox = new Graphics();
playerBox.beginFill(0xFF0000);
playerBox.drawRect(0, 0, 32, 32);
playerBox.endFill();
playerBox.x = startX;
playerBox.y = startY;
playerBox.color = "red";
playerBox.playerColor = 0xFF0000;
playerBox.interactive = true;
playerBox.buttonMode = true;
playerBox.on('pointerdown', startMoving);

var message = new Text(
    "Parabéns! Jogo Concluído!",
    {fontSize: "32px", fontFamily: "futura", fill: "white"}
);
message.x = 70;
message.y = renderer.height/2 - 16;

line.y = startY - 2 + playerBox.height/2;

var state = playLevel00;

var biggerSprite = new Sprite.fromImage('images/bigger.png');
var smallerSprite = new Sprite.fromImage('images/smaller.png');

resizeBox.addChild(biggerSprite);
resizeSmallBox.addChild(smallerSprite);

setup();

function setup() {

    playerBox.vx = 0;
    playerBox.vy = 0;

    scene00 = new Container();
    stage.addChild(scene00);

    scene00.addChild(line);
    scene00.addChild(biggerBox);
    scene00.addChild(resizeBox);
    scene00.addChild(playerBox);

    scene01 = new Container();
    stage.addChild(scene01);
    scene01.visible = false;

    scene02 = new Container();
    stage.addChild(scene02);
    scene02.visible = false;

    scene03 = new Container();
    stage.addChild(scene03);
    scene03.visible = false;
    
    scene04 = new Container();
    stage.addChild(scene04);
    scene04.visible = false;
    
    sceneFinal = new Container();
    stage.addChild(sceneFinal);
    sceneFinal.visible = false;

    gameLoop();
}

function gameLoop(){

    requestAnimationFrame(gameLoop);

    state();

    renderer.render(stage);
}

function playLevel00() {

    if ((playerBox.x + playerBox.vx) <= (biggerBox.x) && (playerBox.x + playerBox.vx) > 0) {
        playerBox.x += playerBox.vx;
        if ((playerBox.x + playerBox.width) >= (resizeBox.x + resizeBox.width)) {
            
            playerBox.vx = 0;
            TweenLite.to(playerBox, 1, {height: 64, y: "-=14", onComplete: function() {
                playerBox.vx = 2;
            }});
            resizeBox.x = renderer.width;
            resizeBox.visible = false;
        }
    }
    else {
        scene00.visible = false;
        
        scene01.addChild(line);
        scene01.addChild(blueBox);
        scene01.addChild(recolorBox);
        scene01.addChild(playerBox);

        playerBox.x = startX;
        playerBox.y = startY;
        playerBox.height = 32;
        playerBox.vx = 0;

        scene01.visible = true;

        state = playLevel01;
    }
    if ((playerBox.y + playerBox.vy) < (renderer.height - playerBox.height) && (playerBox.y + playerBox.vy) > 0) {
        playerBox.y += playerBox.vy;
    }
}

function playLevel01() {
    
    if ((playerBox.x + playerBox.vx) <= (biggerBox.x) && (playerBox.x + playerBox.vx) > 0) {
        playerBox.x += playerBox.vx;
        if ((playerBox.x + playerBox.width) >= (recolorBox.x + recolorBox.width)) {

            playerBox.vx = 0;
            
            TweenLite.ticker.addEventListener("tick", changeColor);

            TweenLite.to(playerBox, 1, {playerColor: 0x0000FF, onComplete: function() {
                TweenLite.ticker.removeEventListener("tick", changeColor);
                playerBox.vx = 2;
            }});

            recolorBox.x = renderer.width;
            recolorBox.visible = false;
        }
    }
    else {
        scene01.visible = false;
        
        scene02.addChild(line);
        scene02.addChild(biggerBox);
        scene02.addChild(resizeBox);
        scene02.addChild(resizeSmallBox);
        scene02.addChild(playerBox);

        playerBox.beginFill(0xFF0000);
        playerBox.drawRect(0, 0, 32, 64);
        playerBox.endFill();
        playerBox.color = "red";
        playerBox.playerColor = 0xFF0000;
        playerBox.x = startX;
        playerBox.y = startY-14;
        playerBox.vx = 0;

        resizeBox.visible = true;
        resizeBox.x = startX+180;

        scene02.visible = true;
        
        state = playLevel02;
    }
    if ((playerBox.y + playerBox.vy) < (renderer.height - playerBox.height) && (playerBox.y + playerBox.vy) > 0) {
        playerBox.y += playerBox.vy;
    }
}

function playLevel02() {
    
    if ((playerBox.x + playerBox.vx) <= (biggerBox.x) && (playerBox.x + playerBox.vx) > 0) {
        playerBox.x += playerBox.vx;
        if ((playerBox.x + playerBox.width) >= (resizeBox.x + resizeBox.width)) {
            
            playerBox.vx = 0;
            TweenLite.to(playerBox, 1, {height: 64, y: "-=14", onComplete: function() {
                playerBox.vx = 2;
            }});
            resizeBox.x = renderer.width;
            resizeBox.visible = false;
        }
        if ((playerBox.x + playerBox.width) >= (resizeSmallBox.x + resizeSmallBox.width)) {
            
            playerBox.vx = 0;
            TweenLite.to(playerBox, 1, {height: 32, y: "+=14", onComplete: function() {
                playerBox.vx = 2;
            }});
            resizeSmallBox.x = renderer.width;
            resizeSmallBox.visible = false;
        }
    }
    else {
        scene02.visible = false;
        
        scene03.addChild(line);
        scene03.addChild(blueBox);
        scene03.addChild(resizeSmallBox);
        scene03.addChild(recolorBox);
        scene03.addChild(playerBox);
        
        resizeSmallBox.visible = true;
        resizeSmallBox.x = startX+180;

        recolorBox.visible = true;
        recolorBox.x = startX+90;

        playerBox.x = startX;
        playerBox.y = startY-14;
        playerBox.vx = 0;

        playerBox.height = 64;
        
        resizeBox.removeChild(biggerSprite);
        choiceBox.addChild(biggerSprite);

        scene03.visible = true;

        state = playLevel03;
    }
    if ((playerBox.y + playerBox.vy) < (renderer.height - playerBox.height) && (playerBox.y + playerBox.vy) > 0) {
        playerBox.y += playerBox.vy;
    }
}

function playLevel03() {
    
    if ((playerBox.x + playerBox.vx) <= (biggerBox.x) && (playerBox.x + playerBox.vx) > 0) {
        playerBox.x += playerBox.vx;
        if ((playerBox.x + playerBox.width) >= (recolorBox.x + recolorBox.width)) {

            playerBox.vx = 0;
            
            TweenLite.ticker.addEventListener("tick", changeBiggerColor);

            TweenLite.to(playerBox, 1, {playerColor: 0x0000FF, onComplete: function() {
                TweenLite.ticker.removeEventListener("tick", changeBiggerColor);
                playerBox.vx = 2;
            }});

            recolorBox.x = renderer.width;
            recolorBox.visible = false;
        }
        if ((playerBox.x + playerBox.width) >= (resizeSmallBox.x + resizeSmallBox.width)) {
            
            playerBox.vx = 0;
            TweenLite.to(playerBox, 1, {height: 32, y: "+=14", onComplete: function() {
                playerBox.vx = 2;
            }});
            resizeSmallBox.x = renderer.width;
            resizeSmallBox.visible = false;
        }
    }
    else {
        scene02.visible = false;
        
        scene03.addChild(line);
        scene03.addChild(biggerBox);
        scene03.addChild(choiceBox);
        scene03.addChild(playerBox);

        choiceBox.interactive = true;
        choiceBox.buttonMode = true;

        playerBox.beginFill(0xFF0000);
        playerBox.drawRect(0, 0, 32, 64);
        playerBox.endFill();
        playerBox.color = "red";
        playerBox.x = startX;
        playerBox.y = startY;
        playerBox.vx = 0;
        playerBox.playerColor = 0xFF0000;

        playerBox.height = 32;

        scene03.visible = true;

        state = playLevel04;
    }
    if ((playerBox.y + playerBox.vy) < (renderer.height - playerBox.height) && (playerBox.y + playerBox.vy) > 0) {
        playerBox.y += playerBox.vy;
    }
}

function playLevel04() {

    choiceBox.on('pointerdown', changeType);

    
    if ((playerBox.x + playerBox.vx) <= (biggerBox.x) && (playerBox.x + playerBox.vx) > 0) {
        playerBox.x += playerBox.vx;
        if ((playerBox.x + playerBox.width) >= (choiceBox.x + choiceBox.width)) {
            switch(choiceBox.type) {
                case 0:
                    playerBox.vx = 0;
                    TweenLite.to(playerBox, 1, {height: 64, y: "-=14", onComplete: function() {
                        playerBox.vx = 2;
                    }});
                    break;
                case 1:
                    playerBox.vx = 0;
                    
                    TweenLite.ticker.addEventListener("tick", changeBiggerColor);
        
                    TweenLite.to(playerBox, 1, {playerColor: 0x0000FF, onComplete: function() {
                        TweenLite.ticker.removeEventListener("tick", changeBiggerColor);
                        playerBox.vx = 2;
                        playerBox.color = "blue";
                    }});
                    break;
                default:
                    playerBox.x = startX;
                    playerBox.vx = 0;
            }
            choiceBox.x = renderer.width;
            choiceBox.visible = false;
        }
    }
    else {
        if (playerBox.height == biggerBox.height && playerBox.width == biggerBox.width && playerBox.color == biggerBox.color) {
            scene03.visible = false;

            sceneFinal.addChild(message);

            sceneFinal.visible = true;
        }
        else {
            playerBox.x = startX;
            playerBox.y = startY;
            playerBox.vx = 0;
            playerBox.height = 32;
            playerBox.beginFill(0xFF0000);
            playerBox.drawRect(0, 0, 32, 64);
            playerBox.endFill();
            playerBox.color = "red";
            choiceBox.x = startX + 120;
            choiceBox.visible = true;
        }
    }
    if ((playerBox.y + playerBox.vy) < (renderer.height - playerBox.height) && (playerBox.y + playerBox.vy) > 0) {
        playerBox.y += playerBox.vy;
    }
}

function changeType() {
    if (choiceBox.type == 0) {
        choiceBox.lineStyle(2, 0xFFFFFF, 1);
        choiceBox.beginFill(0x0000FF);
        choiceBox.drawRect(0, 0, 32, 32);
        choiceBox.removeChild(biggerSprite);
        choiceBox.type = 1;
    }
    else {
        choiceBox.lineStyle(2, 0xFFFFFF, 1);
        choiceBox.beginFill(0x000000);
        choiceBox.drawRect(0, 0, 32, 32);
        choiceBox.addChild(biggerSprite);
        choiceBox.type = 0;
    }
}

function startMoving() {
    playerBox.vx = 2;
}

function changeColor(event) {
    playerBox.beginFill(playerBox.playerColor);
    playerBox.drawRect(0, 0, 32, 32);
    playerBox.endFill();
}

function changeBiggerColor(event) {
    playerBox.beginFill(playerBox.playerColor);
    playerBox.drawRect(0, 0, 32, 64);
    playerBox.endFill();
}