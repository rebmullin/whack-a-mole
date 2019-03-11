(function() {
  var MIN = 250;
  var MAX = 1000;
  var GAME_LENGTH = 10000;

  var holeNodes = document.querySelectorAll(".game-hole");

  // Make holes an array so we can use forEach.
  var holes = Array.prototype.slice.call(holeNodes);

  var startButton = document.querySelector("#start");
  var resetButton = document.querySelector("#reset");
  var stopButton = document.querySelector("#stop");
  var score = document.querySelector(".game-score");

  var timer;
  var startTimeout;
  var timeLeft = GAME_LENGTH;
  var gamePaused = false;
  var newGame = true;

  resetButton.disabled = true;
  stopButton.disabled = true;

  function setRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function setRandomHole(holes, prevIndex) {
    if (!gamePaused) {
      var index = Math.floor(Math.random() * holes.length);

      // Return to get a new index if the last index is not different.
      if (prevIndex === index) {
        return setRandomHole(holes, index);
      }

      var hole = holes[index];
      hole.classList.add("active");

      var time = setRandomTime(MIN, MAX);

      setTimeout(function() {
        popMole(index);
        hole.classList.remove("active");
      }, time);
    }
  }

  function popMole(prevIndex) {
    var index = prevIndex || -1;
    setRandomHole(holes, index);
  }

  function setGameTimer() {
    var gameTimer = timeLeft;
    if (newGame) {
      startTimeout = new Date();
      gameTimer = GAME_LENGTH;
    }

    timer = setTimeout(function() {
      gamePaused = true;
      resetButtons();
    }, gameTimer);
  }

  function whackMole(e) {
    var el = e.target;

    // TODO: look into IE11 not showing active class on el.
    if (el.classList.contains("active") || this.classList.contains("active")) {
      score.textContent++;
      score.setAttribute("aria-label", String(score.textContent));
    }
  }

  holes.forEach(function(hole) {
    return hole.addEventListener("focus", whackMole, true);
  });

  function start() {
    gamePaused = false;
    setGameTimer();
    popMole();
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;
  }

  function reset() {
    clearTimeout(timer);
    gamePaused = false;
    newGame = true;
    score.textContent = 0;
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
  }

  function resetButtons() {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
  }

  function stop() {
    timeLeft -= new Date() - startTimeout;
    clearTimeout(timer);
    gamePaused = true;
    newGame = false;
    resetButtons();
  }

  startButton.addEventListener("click", start);

  resetButton.addEventListener("click", reset);

  stopButton.addEventListener("click", stop);
})();
