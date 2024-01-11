let playerScore = 0;
let computerScore = 0;

let selections = ["Rock", "Paper", "Scissors"];

// function: get computer's random selection

function getComputerSelection() {
  let selection = Math.floor(Math.random() * 3);
  return selections[selection];
}

// function: listen for player selection > call runRound function

let selectionBtns = [
  document.querySelector("#rock"),
  document.querySelector("#paper"),
  document.querySelector("#scissors"),
];

selectionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let playerSelection = e.target.getAttribute("id");
    playerSelection =
      playerSelection.charAt(0).toUpperCase() +
      playerSelection.slice(1).toLowerCase();

    runRound(playerSelection);
  });
});

// function: play 1 round

function runRound(playerSelection) {
  let computerSelection = getComputerSelection();

  if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Scissors" && computerSelection === "Paper")
  ) {
    checkForWinner("player", playerSelection, computerSelection);
  } else if (
    (computerSelection === "Rock" && playerSelection === "Scissors") ||
    (computerSelection === "Paper" && playerSelection === "Rock") ||
    (computerSelection === "Scissors" && playerSelection === "Paper")
  ) {
    checkForWinner("computer", playerSelection, computerSelection);
  } else {
    checkForWinner("tie", playerSelection, computerSelection);
  }
}

// necessary element definitions

const playerSelectionEmoji = document.querySelector("#p-selection");
const computerSelectionEmoji = document.querySelector("#c-selection");
const playerScoreText = document.querySelector("#p-score");
const computerScoreText = document.querySelector("#c-score");
const roundInfo = document.querySelector("#choose-sec").firstElementChild;
const roundMessage = document.querySelector("#choose-sec").lastElementChild;

const popup = document.querySelector("#popup");
const popupText = document.querySelector("#popup-round-status");
const playagainBtn = document.querySelector("#play-again-btn");
const overlay = document.querySelector("#overlay");

let selectionEmojis = ["✊", "✋", "✌"];

// function: check for round status and add points accordingly + call showPopup() function if someone won

function checkForWinner(roundResult, playerSelection, computerSelection) {
  //if someone won call showPopup() function
  if (playerScore >= 5) {
    showPopup("player");
    return;
  } else if (computerScore >= 5) {
    showPopup("computer");
    return;
  }

  //change selectoin emojis based on selections
  const pSelectionEmoji = selectionEmojis[selections.indexOf(playerSelection)];
  const cSelectionEmoji =
    selectionEmojis[selections.indexOf(computerSelection)];

  playerSelectionEmoji.textContent = pSelectionEmoji;
  computerSelectionEmoji.textContent = cSelectionEmoji;

  //declare winner and increase points accordingly
  switch (roundResult) {
    case "tie":
      roundInfo.textContent = "It's a tie!";
      roundMessage.textContent = ``;
      break;
    case "player":
      playerScore++;
      playerScoreText.textContent = `Player: ${playerScore}`;
      roundInfo.textContent = "You won!";
      roundMessage.textContent = `${playerSelection} beats ${computerSelection}.`;
      break;
    case "computer":
      computerScore++;
      computerScoreText.textContent = `Computer: ${computerScore}`;
      roundInfo.textContent = "You lost!";
      roundMessage.textContent = `${computerSelection} beats ${playerSelection}.`;
      break;
  }

  //if someone won call showPopup() function
  if (playerScore >= 5) {
    showPopup("player");
    return;
  } else if (computerScore >= 5) {
    showPopup("computer");
    return;
  }
}

// function: shows play again popup

function showPopup(winner) {
  switch (winner) {
    case "player":
      popupText.textContent = "You won!";
      break;
    case "computer":
      popupText.textContent = "You lost!";
      break;
  }
  popup.classList.add("active");
  overlay.classList.add("active");
}
//close popup when click outside
overlay.addEventListener("click", () => {
  popup.classList.remove("active");
  overlay.classList.remove("active");
});
//reset game when play again button is clicked
playagainBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  overlay.classList.remove("active");
  playerScore = 0;
  computerScore = 0;

  playerScoreText.textContent = `Player: ${playerScore}`;
  computerScoreText.textContent = `Computer: ${computerScore}`;

  roundInfo.textContent = "Choose a weapon";
  roundMessage.textContent = `First of 5 wins!`;
});
