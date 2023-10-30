const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const dots = document.querySelectorAll(".dot"); // getting circle in and query selectorAll creates the node list
const scoreForScoreBoard = document.querySelector(".score");
const audio = new Audio("fish-in-river-6114.mp3");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalMessage = document.querySelector("#scoreMessage");
const scoreDisplay = document.querySelector(".scoreDisplay");
const closeButton = document.querySelector(".close");

//global variables
let score = 0;
let timer;
let pace = 1500;
let active = 0;
let rounds = 0;

let counter = 0;
/* let isModalDisplayed = false;
let immunity = 3;

// test
let isGameStarted = false;
let score = 0;

startButton.addEventListener("click", () => {});
endButton.addEventListener("click", () => {});
dots.addEventListener("click", () => {addScore()});


gameStart() {
  isGameStarted = true
  startButton.style.display = "none"
}

gameEnd() {
alert("Game Ended")

// show modal
}

addScore() {
  score = score + 10
} */

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} //code is from W3school

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const clickDots = (i) => {
  if (i !== active) {
    audio.play(); // play the sound when clicked
    return endGame();
  }
  //console.log("circle was clicked", i);
  score += 10;
  counter++;
  rounds--;
  scoreForScoreBoard.textContent = score;
  if (counter >= 3) {
    isModalDisplayed = true;
  }
};

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    clickDots(i);
  });
});

const enableEvents = () => {
  dots.forEach((dot) => {
    dot.style.pointerEvents = "auto";
  });
};
const startGame = () => {
  startButton.style.display = "none";
  rounds = 0;
  score = 0;
  startRound();
};

const startRound = () => {
  //startButton.classList.add("none");
  //endButton.classList.remove("none");
  enableEvents();
  console.log("game start");
  console.log(rounds);

  if (rounds >= 3) {
    return endGame();
  }

  // enableEvents();
  const newActive = pickNew(active);

  dots[newActive].classList.toggle("active");
  dots[active].classList.remove("active");

  active = newActive;
  timer = setTimeout(startRound, pace);
  pace -= 10;
  rounds++;
};

function pickNew(active) {
  const newActive = getRndInt(0, 3);
  if (newActive !== active) {
    return newActive;
  }

  return pickNew(active);
}

const endGame = () => {
  console.log("game ended");
  //location.reload();
  clearTimeout(timer);
  audio.pause();
  modalShow();
  //resetGame();
};

function modalShow() {
  //modal.classList.toggle("visible")
  overlay.style.display = "block";
  let message = "";
  scoreDisplay.textContent = score;
  if (score < 300) {
    scoreDisplay.textContent = `Your Score is : ${score}`;
    message = `oh-oh, are you having a diet?`;
  } else if (score >= 300 && score < 800) {
    scoreDisplay.textContent = `${score}`;
    message = `Come on, you are getting there! Try again`;
  } else {
    scoreDisplay.textContent = `${score}`;
    message = `WOW! You are such a great fisherman!`;
  }

  modalMessage.textContent = message;
}

const resetGame = () => {
  window.location.reload();
};

/* function displayEndGameModal() {
  console.log("game ended"); // You can remove this console.log
  clearTimeout(timer);
  audio.pause();
  modalShow();
} */

//startButton.addEventListener("click", startGame);

startButton.addEventListener("click", () => {
  audio.play(); // play the sound when the game starts
  startGame();
});
/* endButton.addEventListener("click", () => {
  //alert("ended");
}); */
endButton.addEventListener("click", () => {
  endGame();
  //resetGame();
});

closeButton.addEventListener("click", () => {
  resetGame();
});
