var pause_flg = false;
var score = 0;
var max_time = 60;

function count_down(t) {
    var timerId;
    if (t <= max_time) {
        setTimeout(function() {
            if (!pause_flg) {
                var time = document.getElementById("time");
                time.innerHTML = max_time - t;
                t++;
                count_down(t);
            }
            else {
                count_down(t);
            }
        }, 1000);
    }
    else {
        return 0;
    }
}

function pause() {
    var pause_button = document.getElementById("pause-button");
    
    pause_button.onclick = function() {
        // Pause game
        if (!pause_flg) {
            pause_flg = true;
            pause_button.innerHTML = "Play";
        }
        // Play game
        else {
            pause_flg = false;
            pause_button.innerHTML = "Pause";
        }
    }
}

count_down(0);
pause();