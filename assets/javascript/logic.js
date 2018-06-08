
var words = ["memory", "hardrive", "processor", "desktop", "graphics", "motherboard", "monitor", "google", "chrome", "edge","firefox","overclock","keyboard","emulator"];

var selected_word;
var placeholder;
var userGuess = document.getElementById("user-key");
var win_counter = 0;
var correct_guess_array = [];
var guess_counter = 0;
var guessLength = 0;
var availableGuess = 10;
var wrong_guess_array = [];
//var win_sound = new Audio("/assets/win.mp3");



function newGame() {
    selected_word = words[Math.floor(Math.random() * words.length)];
    placeholder = "";
    wrong_guess_array = [];
    availableGuess = 10;
    guess_counter = 0;
    guessLength = 0;
    correct_guess_array = [];
    for (var i = 0; i < selected_word.length; i++) {
        placeholder = placeholder + "_";
        document.getElementById("placeholder").innerHTML = placeholder;
    }
    entry();
}

function entry(event) {
    if (event === undefined) {
        return;
    }
    else {
        userGuess.textContent = event.key;
        if (wrong_guess_array.indexOf(event.key) > -1 || correct_guess_array.indexOf(event.key) > -1) {
            alert("You have already selected this key");
            return;
        }
        if (availableGuess > guess_counter) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                var isWrongGuess = true;
                for (var i = 0; i < selected_word.length; i++) {
                    if (event.key === selected_word[i]) {
                        correct_guess_array.push(event.key);
                        placeholder = placeholder.slice(0, i) + event.key + placeholder.slice(i + 1);
                        document.getElementById("placeholder").innerHTML = placeholder;
                        guessLength+=1;
                        isWrongGuess = false;
                    }
                }
                if (isWrongGuess && !(wrong_guess_array.indexOf(event.key) > -1)) {
                    wrong_guess_array.push(event.key);
                    availableGuess = availableGuess - 1;
                    document.getElementById("wrong-select").innerHTML = wrong_guess_array;
                    document.getElementById("available-guess").innerHTML = availableGuess;
                }

                if (guessLength === selected_word.length) {
                    win.play();
                    alert("You Win!");
                    win_counter+=1;
                    document.getElementById("win_counter").innerHTML = win_counter;
                    document.getElementById("wrong-select").innerHTML = "";
                    document.getElementById("available-guess").innerHTML = "";
                    document.getElementById("user-key").innerHTML = "";
                    
                   
                    newGame();
                }
            }
            else {
                alert("Please Enter A Valid Character");
            }
        }
        else {
            alert("Game Over!");
            document.getElementById("wrong-select").innerHTML = "";
            document.getElementById("available-guess").innerHTML = "";
            document.getElementById("user-key").innerHTML = "";
            newGame();
        }
    }
}

document.onkeyup = entry;

newGame();