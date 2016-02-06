var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// Bug Definition
var Bug = function (x, y, color, speed) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color;
    this.speed = speed;
}

//function animate(bug, canvas, context, startTime) {
//    // update
//    var time = (new Date()).getTime() - startTime;
//
//    var linearSpeed = 100;
//    // pixels / second
//    var newX = linearSpeed * time / 1000;
//
//    if(newX < canvas.width - myRectangle.width - bug.borderWidth / 2) {
//        bug.x = newX;
//    }
//
//    // clear
//    context.clearRect(0, 0, canvas.width, canvas.height);
//
//    Bug(bug, context);
//
//    // request new frame
//    requestAnimFrame(function() {
//        animate(bug, canvas, context, startTime);
//    });
//}


// Painting one bug with x, y being left top corner
function makeBug(x, y) {

    var color = "red";
    var alpha = ".5";

    //http://www.w3schools.com/tags/canvas_globalalpha.asp
    context.globalAlpha = alpha;

    /*-- Whiskers, legs and arms--*/
    context.beginPath();
    context.moveTo(x,y);

    // Whiskers
    context.lineTo(x+5, y+15);
    context.lineTo(x+10, y);

    context.moveTo(x+5, y+20);
    context.lineTo(x+4, y+22);

    context.lineTo(x+6, y+22);
    context.lineTo(x+5, y+20);

    context.moveTo(x, y+20);
    context.lineTo(x+10, y+40);

    context.moveTo(x+10, y+20);
    context.lineTo(x, y+40);


    context.lineWidth = 2;
    context.strokeStyle = color;

    /*-- Triangles on the tips --*/
    context.moveTo(x,y);
    context.lineTo(x, y+3);
    context.lineTo(x+1.73, y+2.4);
    context.lineTo(x, y);


    context.moveTo(x+10, y);
    context.lineTo(x+8.27, y+2.4);
    context.lineTo(x+10, y+3);
    context.lineTo(x+10, y);


    context.moveTo(x, y+20);
    context.lineTo(x, y+22);
    context.lineTo(x+1.6, y+21.25);
    context.lineTo(x, y+22);


    context.moveTo(x+10, y+20);
    context.lineTo(x+8.4, y+21.25);
    context.lineTo(x+10, y+22);
    context.lineTo(x+10, y+20);


    context.moveTo(x, y+40);
    context.lineTo(x, y+38);
    context.lineTo(x+1.6, y+38.25);
    context.lineTo(x, y+38);


    context.moveTo(x+10, y+40);
    context.lineTo(x+8.4, y+38.25);
    context.lineTo(x+10, y+38);
    context.lineTo(x+10, y+40);
    context.stroke();

    /*-- Body parts --*/
    var height = 20;
    var width = 20;
    context.beginPath();
    context.moveTo(x, y - height/2);
    context.bezierCurveTo(
        x + width/2, y - height/2,
        x + width/2, y + height/2,
        x, y + height/2);
    context.bezierCurveTo(
        x - width/2, y + height/2,
        x - width/2, y - height/2,
        x, y - height/2);

    context.moveTo(x, y + height/2);
    context.bezierCurveTo(
        x + width, y + height/2,
        x + width, y + 1.5 * height,
        x, y + 1.5 * height);
    context.bezierCurveTo(
        x - width, y + 1.5 * height,
        x - width, y + height/2,
        x, y + height/2);


    context.fillStyle = color;
    context.lineWidth = 1;
    context.strokeStyle = "#000000"
    context.stroke();
    context.fill();

    /*-- Eyes and Mouth --*/
    context.beginPath();

    context.arc(x-3, y, 1, 0, 2*Math.PI);
    context.arc(x+3, y, 1, 0, 2*Math.PI);
    context.fillStyle = "black";
    context.fill();
    context.beginPath();
    context.arc(x, y+3, 2.5, 0, Math.PI, false);
    context.stroke();
}