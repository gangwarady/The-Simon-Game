var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).one("keypress", function () {
  nextSequence();
});

$(".btn").click(function () {
  userChosenColour = $(this).attr("id");
  var audio = new Audio("sounds/" + userChosenColour + ".mp3");
  audio.play();
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});
function nextSequence() {
  userClickedPattern = [];
  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (
    userClickedPattern[userClickedPattern.length - 1] ===
    gamePattern[userClickedPattern.length - 1]
  ) {
    if (userClickedPattern.length === gamePattern.length) {
      level++;
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    $(document).one("keypress", function () {
      nextSequence();
    });
  }
}
