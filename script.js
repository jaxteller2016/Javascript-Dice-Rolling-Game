'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const reset = function () {
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--${activePlayer}`).classList.remove('name');
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const showDiceImg = function () {
  diceEl.classList.remove('hidden');
};

const holdTheScore = function () {
  if (playing) {
    //1. Add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the Game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.add('name');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Roll dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Getting a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Display Dice
    diceEl.src = `dice-${dice}.png`;
    showDiceImg();
    //3. Check for rolled 1: If true, switch to next player
    if (dice !== 1) {
      //Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', holdTheScore);
btnNew.addEventListener('click', reset);
