var pause_flg = 0;



// Counter code from
// http://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values

function count_down() {
    var t = 0;
    while (t <= 60) {
        t++;
        count_down_helper(t);
    }
}

function count_down_helper(t) {
    var time = document.getElementById("time");
    //    while (pause_flg == 1) {
    //        null;
    //    }
    setTimeout(function() { time.innerHTML = 60 - t; }, t*1000);
}

function pause() {
    var pause_button = document.getElementById("pause-button");
    
    pause_button.onclick = function() {
        // Pause game
        if (pause_flg == 0) {
            pause_flg = 1;
            pause_button.innerHTML = "Play";
        }
        // Play game
        else {
            pause_flg = 0;
            pause_button.innerHTML = "Pause";
        }
    }
}

count_down();

pause();