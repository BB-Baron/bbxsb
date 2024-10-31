document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('setting-modal');
  const menuIcon = document.getElementById('menu-icon');
  const rocketIcon = document.getElementById('rocket-icon');
  const settingForm = document.getElementById('setting-form');
  const leftPlayerNameInput = document.getElementById('left-player-name-input');
  const rightPlayerNameInput = document.getElementById('right-player-name-input');
  const leftPlayerNameDisplay = document.getElementById('left-player-name');
  const rightPlayerNameDisplay = document.getElementById('right-player-name');
  const countdownVideoSelect = document.getElementById('countdown-video-select');
  const countdownVideo = document.getElementById('countdownVideo');

  leftPlayerNameDisplay.textContent = leftPlayerNameInput.value;
  rightPlayerNameDisplay.textContent = rightPlayerNameInput.value;

  menuIcon.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  settingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    leftPlayerNameDisplay.textContent = leftPlayerNameInput.value;
    rightPlayerNameDisplay.textContent = rightPlayerNameInput.value;
    countdownVideo.src = countdownVideoSelect.value;

    modal.style.display = 'none';
  });

  document.getElementById('reset-button').addEventListener('click', function () {
    resetScoreboard();
  });

  rocketIcon.addEventListener('click', function () {
    startCountdown();
  });

  const decisionButtons = document.querySelectorAll('.decision-button');
  decisionButtons.forEach(button => {
    button.addEventListener('click', function () {
      const value = parseInt(this.getAttribute('data-value'));
      const label = this.getAttribute('data-label');
      if (this.parentElement.id === 'left-decision-buttons') {
        updateScore('left', value, label);
      } else {
        updateScore('right', value, label);
      }
    });
  });
//LR イベントリスナー
  const limitedRulesButtons = document.querySelectorAll('.lr-button');
  limitedRulesButtons.forEach(button => {
    button.addEventListener('click', function () {
      const value = parseInt(this.getAttribute('data-value'));
      const side = this.getAttribute('data-side');
      updateScore(side, value, 'LR');
    });
  });

  function resetScoreboard() {
    document.getElementById('leftScore').textContent = '0';
    document.getElementById('rightScore').textContent = '0';
    document.getElementById('decision-log').innerHTML = '';
    document.getElementById('left-player-name').style.backgroundColor = '';
    document.getElementById('right-player-name').style.backgroundColor = '';
    document.getElementById('left-player-name').style.color = '';
    document.getElementById('right-player-name').style.color = '';
  }

  function updateScore(side, value, label) {
    const scoreElement = document.getElementById(side + 'Score');
    let score = parseInt(scoreElement.textContent);


    score += value;
    scoreElement.textContent = score;
    //勝者の背景色を黄色に
    const victoryPoint = parseInt(document.getElementById('victory-point-input').value);
    const playerNameDiv = document.getElementById(side + '-player-name');
    if (score >= victoryPoint){
      playerNameDiv.style.backgroundColor = 'yellow';
      playerNameDiv.style.color = 'black';
    } else{
      playerNameDiv.style.backgroundColor = '';
      playerNameDiv.style.color = '';
    }

    logDecision(side, value, label);
  }

  function logDecision(side, value, label) {
    const logElement = document.getElementById('decision-log');
    const logEntry = document.createElement('li');
    logEntry.innerHTML = side === 'left' ? `${value}<--${label}` : `${label}-->${value}`;
    logElement.appendChild(logEntry);
  }

  // CSS切り替え
  window.changestyle = function (sheetId, sheetValue) {
    document.getElementById(sheetId).setAttribute('href', sheetValue);
  };
});

// ショートカット
document.addEventListener('keydown', function(event) {
  switch (event.key) {
      case '/':
          resetButton.click();
          break;
      case '*':
          //settingModal.style.display = 'block';
          settingModalElement.style.display = 'block';
          break;
      // Left Side
      case '7':
          leftDecisionButtons[3].click();
          break;
      case '4':
          leftDecisionButtons[2].click();
          break;
      case '1':
          leftDecisionButtons[1].click();
          break;
      case '0':
          leftDecisionButtons[0].click();
          break;
      // Right Side
      case '9':
          rightDecisionButtons[3].click();
          break;
      case '6':
          rightDecisionButtons[2].click();
          break;
      case '3':
          rightDecisionButtons[1].click();
          break;
      case '.':
          rightDecisionButtons[0].click();
          break;
      default:
          break;
  }
});
