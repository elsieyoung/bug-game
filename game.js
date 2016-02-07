//___________________game canvas__________________________

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// Bug Definition
var Bug = function (x, y, color, point, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.point = point;

    this.food = 0;
    this.food_x = 0;
    this.food_y = 0;
    this.speed_x = 0;
    this.speed_y = 0;
}

// Food Definition
var Food = function (x, y) {
    this.x = x;
    this.y = y;
}

var bugNum = 20;
var foodNum = 5;
var bugList = [];
var foodList = [];

function init_bug() {
    // Initialize bugs
    if (!pause_flg) {
        var x = 50 + Math.random() * (canvas.width - 100);
        var y = 0;

        var colorList = ['black', 'black', 'black','red','red','red', 'orange', 'orange', 'orange', 'orange'];
        var color = colorList[parseInt((Math.random() * 10), 10)];

        if (color == 'black') {
            var point = 5;
            var speed = 1.5;
        } else if (color == 'red') {
            var point = 3;
            var speed = 0.75;
        } else {
            var point = 1;
            var speed = 0.6;
        }

        bugList.push(new Bug(x, y, color, point, speed));
    }
}

function update_bug(bug) {
    // Initial distance
    var food = foodList[0];
    var food_x = foodList[0].x;
    var food_y = foodList[0].y;
    var distance_x = food_x - bug.x;
    var distance_y = food_y - bug.y;
    var distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y);

    var temp_x, temp_y, temp_distance;
    for(var l = 0; l < foodList.length; l++){
        temp_x = foodList[l].x - bug.x;
        temp_y = foodList[l].y - bug.y;
        temp_distance = Math.sqrt(temp_x * temp_x + temp_y * temp_y);

        if(temp_distance < distance){
            distance = temp_distance;
            food = foodList[l];
            food_x = foodList[l].x;
            food_y = foodList[l].y;
            distance_x = food_x - bug.x;
            distance_y = food_y - bug.y;
        }
    }

    bug.food = food;
    bug.food_x = food_x;
    bug.food_y = food_y;

    // Calculate speed
    bug.speed_x = (distance_x / distance) * bug.speed;
    bug.speed_y = (distance_y / distance) * bug.speed;


    // Move to food
    if (distance > 10) {
        bug.x += bug.speed_x;
        bug.y += bug.speed_y;
    }
    // Eat food
    else{
        foodList.splice(foodList.indexOf(bug.food), 1);

        if (foodList.length == 0){
            finish_game(true);
        }
    }

}

function init_food() {
    //Initialize food
    for(var j = 0; j < foodNum; j++){
        var x = Math.floor(Math.random() * (350 - 50) + 50);
        var y = Math.floor(Math.random() * (550 - 50) + 50);
        foodList.push(new Food(x, y));
    }
}


function start() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!pause_flg) {
        bugList.forEach(function(bug){
            update_bug(bug);
            makeBug(bug.x, bug.y, bug.color);
        });
        foodList.forEach(function(food){
            makeFood(food.x, food.y);
        });
    }

    requestAnimationFrame(start);
}

init_food();
setInterval(init_bug, Math.random()*3000);
start();



//function animate(bug) {
//
//    bug.x += bug.speed_x;
//    bug.y += bug.speed_y;
//
//        // Collision
//        //if (bugList[i].x < 5 || bugList[i].x > canvas.width - 12) {
//        //    bugList[i].speed_x *= -1;
//        //} else if (bugList[i].y < 5 || bugList[i].y > canvas.height - 40) {
//        //    bugList[i].speed_y *= -1;
//        //}
//
//
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    makeBug(bug.x, bug.y, bug.color);
//    setTimeout(animate, 500);
//}

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
    context.globalAlpha = 0.8;
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, x, y, 25, 25);
    }
    img.src = 'images/1.png';


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
var max_time = 10;

var info_bar = document.getElementById("info-bar");
var ctx = info_bar.getContext("2d");

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

// Counter
function count_down(t) {
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
        finish_game(false);
    }
}

// Reference: http://miloq.blogspot.ca/2011/05/coordinates-mouse-click-canvas.html
function pause() {
    info_bar.onclick = function(event) {
        var x = event.x - info_bar.offsetLeft;
        var y = event.y - info_bar.offsetTop;
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

function finish_game(game_over) {
    if (sessionStorage.level == 1) {
        if (sessionStorage.score1 == null || sessionStorage.score1 < score) {
            sessionStorage.score1 = score;
        }
        if (game_over) {
            pause_flg = true;
            
            var final_score = document.getElementById("final_score");
            final_score.innerHTML = score;
            
            var popup = document.getElementById("popup");
            popup.style.display = "block";
            
            var exit = document.getElementById("exit");
            exit.onclick = function() {
                window.location = "./a2.html";
            }
            
            var restart = document.getElementById("restart");
            restart.onclick = function() {
                sessionStorage.level = 1;
                window.location = "./game.html";
            }
        }
        else {
            sessionStorage.level = 2;
            window.location = "./game.html";
        }
    }
    else {
        sessionStorage.level = 1;
        
        if (sessionStorage.score2 == null || sessionStorage.score2 < score) {
            sessionStorage.score2 = score;
        }
        var popup = document.getElementById("popup");
        popup.style.display = "block";
        
        var exit = document.getElementById("exit");
        var restart = document.getElementById("restart");
        exit.onclick = function() {
            window.location = "./a2.html";
        }
        restart.onclick = function() {
            window.location = "./game.html";
        }
    }
}


set_score(score)
set_pause_button("PAUSE");
set_timer(max_time);
count_down(0);
pause();


