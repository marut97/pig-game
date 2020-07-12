/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var gamePlaying = false;

newGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
  // If game isnt playing, return
  if (!gamePlaying) return;
  //generate a random number
  var dice = Math.floor(Math.random() * 6) + 1;

  //2. Display result
  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "block";
  diceDom.src = "dice-" + dice + ".png";

  //3. Update the round score if the rolled number is not a 1
  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    //Next player
    nextPlayer();
  }

  document.getElementById("score-" + activePlayer);
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  // If game isnt playing, return
  if (!gamePlaying) return;
  //Add current score to global score
  scores[activePlayer] += roundScore;
  //Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
  //Check if the player won the game
  if (scores[activePlayer] >= 100) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    gamePlaying = false;
  } else {
    //Next player
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", function () {
  //Reset the game
  newGame();
});

function nextPlayer() {
  document.getElementById("current-" + activePlayer).textContent = "0";
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function newGame() {
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
  document.getElementById("name-" + activePlayer).textContent =
    "Player " + (activePlayer + 1);
  roundScore = 0;
  scores = [0, 0];
  gamePlaying = true;
}
