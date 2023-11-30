
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


// Trigger nextSequence when the user presses a key
$(document).on("keypress", function() {
    if (level === 0) {
        $("#level-title").text("Level " + 0);
    }
        nextSequence();
});


// Function to show the button to press on the sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); 
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    audio.volume = 0.2;
    $("#level-title").text("Level " + level);
    level++;
    userClickedPattern = []; // Reset the userClickedPattern
}

// Function to check which button was pressed
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    audio.volume = 0.2;
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


// Function to animate the button pressed
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to check if the answer is correct
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        audio.volume = 0.2;
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Function to start over the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
