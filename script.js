let is24Hour = false;
let alarmTime = null;
let alarmSound = document.getElementById("alarmAudio");

// Request notification permission when page loads
if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
            alert("Please allow notifications to receive alarm popup.");
        }
    });
}

// Stopwatch variables
let stopwatchInterval = null;
let stopwatchSeconds = 0;
let isRunning = false;


// CLOCK FUNCTION
function updateClock() {

    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let displayTime;

    if (!is24Hour) {
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;

        displayTime =
            format(hours) + ":" +
            format(minutes) + ":" +
            format(seconds) + " " + ampm;
    } else {
        displayTime =
            format(hours) + ":" +
            format(minutes) + ":" +
            format(seconds);
    }

    document.getElementById("time").innerText = displayTime;
    document.getElementById("date").innerText = now.toDateString();

    // ALARM CHECK
    if (alarmTime) {

        let currentTime =
            format(now.getHours()) + ":" +
            format(now.getMinutes());

        if (currentTime === alarmTime) {

            // Play sound
            alarmSound.play();

            // Desktop Notification
            if (Notification.permission === "granted") {
                new Notification("⏰ Alarm Ringing!", {
                    body: "Your alarm time has been reached!",
                    icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png"
                });
            }

            alarmTime = null;
        }
    }
}

setInterval(updateClock, 1000);
updateClock();


// FORMAT FUNCTION
function format(num) {
    return num < 10 ? "0" + num : num;
}


// DARK MODE
function toggleMode() {
    document.body.classList.toggle("dark");
}


// 12/24 FORMAT
function toggleFormat() {
    is24Hour = !is24Hour;
}


// ALARM FUNCTIONS
function setAlarm() {
    alarmTime = document.getElementById("alarmTime").value;
    alert("Alarm set for " + alarmTime);
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}


// STOPWATCH FUNCTIONS
function startStopwatch() {

    if (isRunning) return;

    isRunning = true;

    stopwatchInterval = setInterval(() => {

        stopwatchSeconds++;

        let hrs = Math.floor(stopwatchSeconds / 3600);
        let mins = Math.floor((stopwatchSeconds % 3600) / 60);
        let secs = stopwatchSeconds % 60;

        document.getElementById("stopwatch").innerText =
            format(hrs) + ":" + format(mins) + ":" + format(secs);

    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    isRunning = false;
    document.getElementById("stopwatch").innerText = "00:00:00";
}