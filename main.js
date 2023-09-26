const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const dots = document.querySelectorAll(".dot"); // getting circle in and queryselectorAll creats the nodelist
const scoreDisplay = document.querySelector(".score");

//global varibales
let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;

/* function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} code is from W3school */

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const clickCircle = (i) => {
  if (i !== active) {
    return endGame();
  }
  console.log("circle was clicked", i);
  score += 1;
  scoreDisplay.textContent = score;
};

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => clickCircle(i));
});

const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }

  const newActive = pickNew(active);

  dots[newActive].classList.toggle("active");
  dots[active].classList.remove("active");

  active = newActive;
  timer = setTimeout(startGame, pace);
  pace -= 10;
  rounds--;
  function pickNew(active) {
    const newActive = getRndInt(0, 3);
    if (newActive !== active) {
      return newActive;
    }

    return pickNew(active);
  }
};

const endGame = () => {
  clearTimeout(timer);
  console.log(endGame);
};

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
