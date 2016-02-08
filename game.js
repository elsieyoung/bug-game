//___________________game canvas__________________________

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var score = 0;
var click_x;
var click_y;

canvas.addEventListener("mousedown", getPosition, false);
canvas.addEventListener("mouseup", releasePosition, false);

/// Response to user tapping/clicking
function getPosition(event) {
    click_x = event.offsetX;
    click_y = event.offsetY;
}

/// Response to user tapping/clicking
function releasePosition(event) {
    click_x = 0;
    click_y = 0;
}

// Bug Definition
var Bug = function (x, y, color, point, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.point = point;
    this.size = 25;

    this.food = 0;
    this.food_x = 0;
    this.food_y = 0;
    this.food_distance = 0;
    this.speed_x = 0;
    this.speed_y = 0;
    this.dir = 0;
    this.opacity = 0.8;
    this.killed = false;
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
        var x = Math.random()*380 + 10;
        var y = 10;

        var mult = 1;
        if (sessionStorage.level == 2) {
            mult = 2;
        }

        var colorList = ['black', 'black', 'black','red','red','red', 'orange', 'orange', 'orange', 'orange'];
        var color = colorList[parseInt((Math.random() * 10), 10)];

        if (color == 'black') {
            var point = 5;
            var speed = 1.5 * mult;
        } else if (color == 'red') {
            var point = 3;
            var speed = 0.75 * mult;
        } else {
            var point = 1;
            var speed = 0.6 * mult;
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
    bug.food_distance = distance;

    // Calculate speed
    bug.speed_x = (distance_x / distance) * bug.speed;
    bug.speed_y = (distance_y / distance) * bug.speed;

    // Direction of the bug
    var degree = Math.atan2(distance_y, distance_x);
    bug.dir = degree;

    var bug2 = collision_detect(bug);
    // Collision
    if (bug2 != false) {
        handle_collision(bug, bug2);
    }
    // Move to food
    if (!bug.killed && distance > bug.size) {
        bug.x += bug.speed_x;
        bug.y += bug.speed_y;
    }
    // Eat food
    else {
        if (!bug.killed) {
            foodList.splice(foodList.indexOf(bug.food), 1);
        }

        if (foodList.length == 0){
            finish_game(true);
        }
    }
}

// Returns the onstacle bug if there is a collision
// Returns false if no collision
function collision_detect(bug) {
    for (var j = 0; j < bugList.length; j++) {
        var bug2 = bugList[j];
        if (bug2 == bug) {
            continue;
        }
        
        var dX = bug2.x - bug.x;
        var dY = bug2.y - bug.y;
        var distance = Math.sqrt(dX * dX + dY * dY);
        
        if (distance <= bug.size) {
            return bug2;
        }
    }
    
    return false;
}

// Moves the bug from a priotized bug
// while the prioritized bug's position does not change
function handle_collision(bug, bug2) {
    // Let bug2 go through
    if (bug.speed < bug2.speed) {
        // bug on the left
        if (bug.x < bug2.x) {
            bug.x = bug.x - bug.speed;
        }
        // bug on the right
        else {
            bug.x = bug.x + bug.speed;
        }
    }
    // Move the left bug if they have the same speed
    else if (bug.speed == bug2.speed && bug.x < bug2.x) {
        bug.x = bug.x - bug.speed;
    }
}

// Kill the Bug
function kill(click_x,click_y,i){
    var cx = bugList[i].x - click_x;
    var cy = bugList[i].y - click_y;
    var click_dist = Math.sqrt(cx*cx + cy*cy);
    if (click_dist <= 30) {
        if (bugList[i].color == "orange"){
            score += 1;
        }
        else if (bugList[i].color == "red"){
            score += 3;
        }
        else {
            score += 5;
        }
        set_score(score);
        return true;
    }
    return false;
}

function init_food() {
    var x, y;
    var overlap = true;
    while(overlap) {
        overlap = false;

        x = Math.floor(Math.random() * (350 - 50) + 50);
        y = Math.floor(Math.random() * (550 - 100) + 120);

        for (var k = 0; k < foodList.length; k++) {
            var food_x = foodList[k].x - x;
            var food_y = foodList[k].y - y;
            var food_dist = Math.sqrt(food_x*food_x + food_y*food_y);
            if(food_dist < 50){
                overlap = true;
                break;
            }
        }
    }
    foodList.push(new Food(x, y));
}


function play() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!pause_flg) {
        for(var k = 0; k < bugList.length; k++){
            if (bugList[k].killed == true) {
                //opacity
                bugList[k].opacity -= 1/120;

                if(bugList[k].opacity <= 0){
                    bugList.splice(bugList[k], 1);
                }
            } else {
                if(!bugList[k].killed && kill(click_x,click_y,k)){
                    bugList[k].killed = true;
                }
            }
        }
        bugList.forEach(function(bug){
            update_bug(bug);
            makeBug(bug.x, bug.y, bug.color, bug.dir, bug.opacity);
        });
        foodList.forEach(function(food){
            makeFood(food.x, food.y);
        });
        requestAnimationFrame(play);
    } else {
        bugList.forEach(function(bug){
            makeBug(bug.x, bug.y, bug.color, bug.dir, bug.opacity);
        });
        foodList.forEach(function(food){
            makeFood(food.x, food.y);
        });
        requestAnimationFrame(play);
    }
}

function start() {
    for(var j = 0; j < foodNum; j++){
        init_food();
    }

    setInterval(init_bug, (Math.random()*2 + 1) * 1000);
//    setTimeout("play()", 1000/60);
    play();
}

start();

// Painting one bug with x, y and color
function makeBug(x, y, color, dir, opacity) {
    
    ////http://www.w3schools.com/tags/canvas_globalalpha.asp
    context.globalAlpha = opacity;

    context.save();
    context.translate(x, y);
    context.rotate(dir);

    /*-- Whiskers, legs and arms--*/
    context.beginPath();
    context.moveTo(-8, -10);
    context.lineTo(-13, -15);
    context.moveTo(-13, -15);
    context.lineTo(-13, -12);

    context.moveTo(0, -10);
    context.lineTo(0, -17);
    context.moveTo(0, -17);
    context.lineTo(2, -17);

    context.moveTo(0, 10);
    context.lineTo(0, 17);
    context.moveTo(0, 17);
    context.lineTo(2, 17);

    context.moveTo(8, 10);
    context.lineTo(13, 15);
    context.moveTo(13, 15);
    context.lineTo(13, 12);

    context.moveTo(-8, 10);
    context.lineTo(-13, 15);
    context.moveTo(-13, 15);
    context.lineTo(-13, 12);

    context.moveTo(8, -10);
    context.lineTo(13, -15);
    context.moveTo(13, -15);
    context.lineTo(13, -12);

    context.lineWidth = 1.5;
    context.strokeStyle = "#333333";
    context.stroke()

    /*-- Body parts --*/
    var height = 23;
    var width = 20;
    context.beginPath();
    context.moveTo(0, -height/2);
    context.bezierCurveTo(width, -height/2,
        width, height/2,
        0, height/2);
    context.bezierCurveTo(-width, height/2,
        -width, -height/2,
        0, -height/2);
    context.lineWidth = 1;
    context.fillStyle = color;
    context.fill();
    context.beginPath();

    context.arc(15 ,0, 7, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();

    /*-- Eyes and Mouth --*/
    context.beginPath();
    context.arc(17 , -3, 1.5, 0, 2 * Math.PI);
    context.arc(17, 3, 1.5, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.restore();
}

function makeFood(x, y) {
    context.globalAlpha = 0.8;
    var img = new Image();
    img.src = 'images/1.png';
    img.onload = function () {
        context.drawImage(img, x, y, 25, 25);
    }
    


};

// __________________info-bar___________________________
//var canvas = document.getElementById("info-bar");
//var ctx = canvas.getContext("2d");
//ctx.font = "20px Impact";
//ctx.fillText("Hello World",10,50);


//_________________ functionalities __________________

var pause_flg = false;
var score = 0;
var max_time = 60;

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
    ctx.clearRect(250, 0, 150, 25);
    
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
function pause(event) {
    var x = event.offsetX;
    var y = event.offsetY;
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

function finish_game(game_over) {
    // Save score if highest
    if (sessionStorage.level == 1) {
        if (sessionStorage.score1 == null || sessionStorage.score1 < score) {
            sessionStorage.score1 = score;
        }
    }
    else {
        if (sessionStorage.score2 == null || sessionStorage.score2 < score) {
            sessionStorage.score2 = score;
        }
    }
    
    if (game_over || sessionStorage.level == 2) {
        pause_flg = true;
        sessionStorage.level = 1;
        
        document.getElementById("final_score").innerHTML = score;
        document.getElementById("popup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }
    else {
        sessionStorage.level = 2;
        window.location = "./game.html"
    }
}

set_score(score);
set_timer(max_time);
set_pause_button("PAUSE");
info_bar.addEventListener('click', pause, false);
count_down(0);
pause();


