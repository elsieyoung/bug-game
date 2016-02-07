//___________________game canvas__________________________

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// Bug Definition
var Bug = function (x, y, color, vX, vY) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vX = vX;
    this.vY = vY;
}

// Food Definition
var Food = function (x, y) {
    this.x = x;
    this.y = y;
}

var bugNum = 20;
var foodNum = 10;
var bugList = [];
var foodList = [];

function start() {
    //Initialize food
    for(var j = 1; j < foodNum; j++){
        var x = Math.floor((Math.random() * 400) + 1);
        var y = Math.floor((Math.random() * 400) + 200);
        makeFood(x, y);
        foodList.push(new Food(x, y));
    }



    // Initialize bugs
    for (var i = 0; i < bugNum; i++) {
        var x = 50 + Math.random() * (canvas.width - 100);
        var y = 20 + Math.random() * (canvas.height - 200);

        var colorList = ['#CD5C5C', '#FFA500', '#000000'];
        var color = colorList[parseInt((Math.random() * 3), 10)];

        var vX = Math.random() * 4 - 2;
        var vY = Math.random() * 4 - 2;

        bugList.push(new Bug(x, y, color, vX, vY));
    }
    animate();
}

function animate() {
    for (var i = 0; i < bugNum; i++) {
        bugList[i].x += bugList[i].vX;
        bugList[i].y += bugList[i].vY;
        if (bugList[i].x < 5 || bugList[i].x > canvas.width - 12) {
            bugList[i].vX *= -1;
        } else if (bugList[i].y < 5 || bugList[i].y > canvas.height - 40) {
            bugList[i].vY *= -1;
        }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < bugNum; i++) {
        var bug = bugList[i];
        makeBug(bug.x, bug.y, bug.color);
    }
    setTimeout(animate, 33);
}

// Painting one bug with x, y and color
function makeBug(x, y, color) {

    //http://www.w3schools.com/tags/canvas_globalalpha.asp
    context.globalAlpha = 0.5;

    /*-- Whiskers, legs and arms--*/
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 5, y + 15);
    context.lineTo(x + 10, y);
    context.moveTo(x + 5, y + 20);
    context.lineTo(x + 4, y + 22);
    context.lineTo(x + 6, y + 22);
    context.lineTo(x + 5, y + 20);
    context.moveTo(x, y + 20);
    context.lineTo(x + 10, y + 40);
    context.moveTo(x + 10, y + 20);
    context.lineTo(x, y + 40);
    context.lineWidth = 2;
    context.strokeStyle = color;

    /*-- Triangles on the tips --*/
    context.moveTo(x, y);
    context.lineTo(x, y + 3);
    context.lineTo(x + 1.73, y + 2.4);
    context.lineTo(x, y);
    context.moveTo(x + 10, y);
    context.lineTo(x + 8.27, y + 2.4);
    context.lineTo(x + 10, y + 3);
    context.lineTo(x + 10, y);
    context.moveTo(x, y + 20);
    context.lineTo(x, y + 22);
    context.lineTo(x + 1.6, y + 21.25);
    context.lineTo(x, y + 22);
    context.moveTo(x + 10, y + 20);
    context.lineTo(x + 8.4, y + 21.25);
    context.lineTo(x + 10, y + 22);
    context.lineTo(x + 10, y + 20);
    context.moveTo(x, y + 40);
    context.lineTo(x, y + 38);
    context.lineTo(x + 1.6, y + 38.25);
    context.lineTo(x, y + 38);
    context.moveTo(x + 10, y + 40);
    context.lineTo(x + 8.4, y + 38.25);
    context.lineTo(x + 10, y + 38);
    context.lineTo(x + 10, y + 40);
    context.stroke();

    /*-- Body parts --*/
    context.beginPath();
    context.arc(x + 5, y + 15, 5, 0, 2 * Math.PI);
    context.moveTo(x + 5, y + 21);
    context.bezierCurveTo(x, y + 20, x, y + 30, x + 5, y + 38.75);
    context.moveTo(x + 5, y + 21);
    context.bezierCurveTo(x + 10, y + 20, x + 10, y + 30, x + 5, y + 38.75);
    context.fillStyle = color;
    context.lineWidth = 1;
    context.strokeStyle = "#000000"
    context.stroke();
    context.fill();

    /*-- Eyes and Mouth --*/
    context.beginPath();
    context.arc(x + 3.3, y + 13.2, 1, 0, 2 * Math.PI);
    context.arc(x + 6.75, y + 13.2, 1, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.beginPath();
    context.arc(x + 5, y + 15, 2.5, 0, Math.PI, false);
    context.stroke();
}

function makeFood(x, y) {

    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x-10,y+40);
    context.closePath();
    context.stroke();

    context.fillStyle = "#00BFFF";
    context.beginPath();
    context.arc(x,y,20,0,2*Math.PI);
    context.closePath();
    context.fill();

    context.fillStyle = "#FFFFFF";
    context.beginPath();
    context.arc(x,y,17,0,2*Math.PI);
    context.closePath();
    context.fill();


};

start();

// __________________info-bar___________________________
//var canvas = document.getElementById("info-bar");
//var ctx = canvas.getContext("2d");
//ctx.font = "20px Impact";
//ctx.fillText("Hello World",10,50);


//_________________ functionalities __________________

var pause_flg = false;
var score = 0;
var max_time = 5;

var canvas = document.getElementById("info-bar");
var ctx = canvas.getContext("2d");

// Draw timer
function set_timer(time) {
    ctx.clearRect(0, 0, 150, 25);
    
    ctx.font = "900 20px Verdana";
    ctx.fillStyle = "#ccffb3";
    ctx.textAlign="start";
    ctx.fillText(time + " sec", 0, 20);

    ctx.font = "900 20px Verdana";
    ctx.textAlign="start";
    ctx.strokeText(time + " sec", 0, 20);
}

// Draw pause button
function set_pause_button(text) {
    ctx.clearRect(150, 0, 100, 25);
    
    ctx.font = "900 20px Verdana";
    ctx.fillStyle = "#ccffb3";
    ctx.textAlign="center";
    ctx.fillText(text,200,20);
    
    ctx.font = "900 20px Verdana";
    ctx.textAlign="center";
    ctx.strokeText(text,200,20);
}

// Draw score
function set_score(score) {
    ctx.clearRect(400, 0, 150, 25);
    
    ctx.font = "900 20px Verdana";
    ctx.fillStyle = "#ccffb3";
    ctx.textAlign="end";
    ctx.fillText(score + " pt", 400, 20);
    
    ctx.font = "900 20px Verdana";
    ctx.textAlign="end";
    ctx.strokeText(score + " pt", 400, 20);
}

// Score

function count_down(t) {
    var timerId;
    if (t < max_time) {
        setTimeout(function() {
            if (!pause_flg) {
                set_timer(max_time - t - 1);
                count_down(t + 1);
            }
            else {
                count_down(t);
            }
        }, 1000);
    }
    else {
        set_timer(max_time - t);
        finish_game();
    }
}

// Reference: http://miloq.blogspot.ca/2011/05/coordinates-mouse-click-canvas.html
function pause() {
    canvas.onclick = function(event) {
        var x = event.x - canvas.offsetLeft;
        var y = event.y - canvas.offsetTop;
        // Pause game
        if (!pause_flg &&
            x > 200 - ctx.measureText("PAUSE").width / 2 && x < 200 + ctx.measureText("PAUSE").width / 2) {
            pause_flg = true;
            set_pause_button("RESUME");
        }
        // Play game
        else if (pause_flg &&
                 x > 200 - ctx.measureText("RESUME").width / 2 && x < 200 + ctx.measureText("RESUME").width / 2) {
            pause_flg = false;
            set_pause_button("PAUSE");
        }
    }
}

function finish_game() {
    if (sessionStorage.level == 1) {
        sessionStorage.level = 2;
        if (sessionStorage.score1 == null || sessionStorage.score1 < score) {
            sessionStorage.score1 = score;
        }
        window.location = "./game.html";
    }
    else {
        if (sessionStorage.score2 == null || sessionStorage.score2 < score) {
            sessionStorage.score2 = score;
        }
        var popup = document.getElementById("popup");
        popup.style.display = '';
        
        var exit = document.getElementById("exit");
        var restart = document.getElementById("restart");
        
        exit.onclick = function() {
            window.location = "./a2.html";
        }
        restart.onclick = function() {
            sessionStorage.level = 1;
            window.location = "./game.html";
        }
    }
}


set_score(score)
set_pause_button("PAUSE");
set_timer(max_time);
count_down(0);
pause();


