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

    var bugNum = 15;
    var bugList = [];

    function start() {
        for (var i = 0; i < bugNum; i++) {
            var x = 50 + Math.random() * (canvas.width - 50);
            var y = 20 + Math.random() * (canvas.height - 100);

            var color = getRandomColor();

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
        context.globalAlpha = 0.8;

        /*-- Whiskers, legs and arms--*/
        context.beginPath();
        context.moveTo(x - 8, y - 5);
        context.lineTo(x - 10, y - 12);
        context.moveTo(x - 10, y - 12);
        context.lineTo(x - 13, y - 15);

        context.moveTo(x + 8, y - 5);
        context.lineTo(x + 10, y - 12);
        context.moveTo(x + 10, y - 12);
        context.lineTo(x + 13, y - 15);

        context.moveTo(x - 9, y);
        context.lineTo(x - 14, y);
        context.moveTo(x - 14, y);
        context.lineTo(x - 17, y + 2);

        context.moveTo(x + 9, y);
        context.lineTo(x + 14, y);
        context.moveTo(x + 14, y);
        context.lineTo(x + 17, y + 2);

        context.moveTo(x - 8, y + 5);
        context.lineTo(x - 10, y + 12);
        context.moveTo(x - 10, y + 12);
        context.lineTo(x - 13, y + 15);

        context.moveTo(x + 8, y + 5);
        context.lineTo(x + 10, y + 12);
        context.moveTo(x + 10, y + 12);
        context.lineTo(x + 13, y + 15);

        context.lineWidth = 1.5;
        context.strokeStyle = "#333333";
        context.stroke();


        /*-- Body parts --*/
        var height = 25;
        var width = 25;
        context.beginPath();
        context.moveTo(x, y - height/2);
        context.bezierCurveTo(x + width/2, y - height/2,
            x + width/2, y + height/2,
            x, y + height/2);
        context.bezierCurveTo(x - width/2, y + height/2,
            x - width/2, y - height/2,
            x, y - height/2);
        context.lineWidth = 1;
        context.fillStyle = color;
        context.fill();
        context.beginPath();
        context.arc(x , y + 13, 6, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();

        /*-- Eyes and Mouth --*/
        context.beginPath();
        context.arc(x - 3 , y + 15, 1.5, 0, 2 * Math.PI);
        context.arc(x + 3, y + 15, 1.5, 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();

    }

    start();


// Credit: http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function get_score() {
    var radio_button = document.getElementsByName("level");
    var score = document.getElementById("score");

    radio_button[0].onclick = function() {
        if (sessionStorage.score1 != null) {
            score.innerHTML = sessionStorage.score1;
        }
    }
    radio_button[1].onclick = function() {
        if (sessionStorage.score2 != null) {
            score.innerHTML = sessionStorage.score2;
        }
    }
}

sessionStorage.level = 1;
get_score();