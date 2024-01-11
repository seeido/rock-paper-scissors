let playerScore = 0;
let computerScore = 0;

// function: get computer's random selection
let selections = ["Rock", "Paper", "Scissors"];

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

// function: check for round status and add points accordingly

const playerSelectionEmoji = document.querySelector("#p-selection");
const computerSelectionEmoji = document.querySelector("#c-selection");
const playerScoreText = document.querySelector("#p-score");
const computerScoreText = document.querySelector("#c-score");
const roundInfo = document.querySelector("#choose-sec").firstElementChild;
const roundMessage = document.querySelector("#choose-sec").lastElementChild;

let selectionEmojis = ["✊", "✋", "✌"];

function checkForWinner(roundResult, playerSelection, computerSelection) {
  if (playerScore >= 5 || computerScore >= 5) {
    console.log("Round ended");
    return;
  }

  const pSelectionEmoji = selectionEmojis[selections.indexOf(playerSelection)];
  const cSelectionEmoji =
    selectionEmojis[selections.indexOf(computerSelection)];

  playerSelectionEmoji.textContent = pSelectionEmoji;
  computerSelectionEmoji.textContent = cSelectionEmoji;

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

  if (playerScore >= 5 || computerScore >= 5) {
    console.log("Round ended");
    return;
  }
}
