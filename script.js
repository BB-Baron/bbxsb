const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');
const victoryPointInput = document.getElementById('victory-point-input');
const decisionLogElement = document.getElementById('decision-log');

const leftDecisionButtons = document.querySelectorAll('#left-decision-buttons .decision-button');
const rightDecisionButtons = document.querySelectorAll('#right-decision-buttons .decision-button');

const resetButton = document.getElementById('reset-button');

const leftPlayerNameElement = document.getElementById('left-player-name');
const rightPlayerNameElement = document.getElementById('right-player-name');
const settingModalElement = document.getElementById('setting-modal');
const settingFormElement = document.getElementById('setting-form');

const resetButtonElement = document.getElementById('reset-button');
resetButtonElement.addEventListener('click', () => {
  leftPlayerNameElement.textContent = 'Left';
  rightPlayerNameElement.textContent = 'Right';
});
resetButton.addEventListener('click', () => {
  leftScore = 0;
  rightScore = 0;
  decisionLogElement.innerHTML = '';
  leftPlayerNameElement.style.color = '';
  rightPlayerNameElement.style.color = '';
  updateScore();
});

// 初期表示
leftPlayerNameElement.textContent = 'Left';
rightPlayerNameElement.textContent = 'Right';

let leftScore = 0;
let rightScore = 0;
let victoryPoint = 4;

const decisionPoints = {
  'Spin': 1,
  'Burst': 2,
  'Over': 2,
  'Xtream': 3,
};

updateScore();

victoryPointInput.addEventListener('change', () => {
  victoryPoint = parseInt(victoryPointInput.value);
  updateScore();
});


leftDecisionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addDecisionLog('<--', button.textContent, decisionPoints[button.textContent]);
    leftScore += decisionPoints[button.textContent];
    updateScore();
  });
});

rightDecisionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addDecisionLog('-->', button.textContent, decisionPoints[button.textContent]);
    rightScore += decisionPoints[button.textContent];
    updateScore();
  });
});

//log
function addDecisionLog(side, decision, point) {
  const liElement = document.createElement('li');
  if (side == '<--') {
	  liElement.textContent = `${point} ${side} ${decision}`;
  }else{
	  liElement.textContent = `${decision}${side} ${point}`;
  }
  decisionLogElement.appendChild(liElement);
  decisionLogElement.scrollTop = decisionLogElement.scrollHeight;
}



function updateScore() {
  leftScoreElement.textContent = leftScore;
  rightScoreElement.textContent = rightScore;

  if (leftScore >= victoryPoint) {
    leftPlayerNameElement.style.backgroundColor = 'yellow';
    leftPlayerNameElement.style.color = 'black';
  } else {
    leftPlayerNameElement.style.backgroundColor = '';
  }

  if (rightScore >= victoryPoint) {
    rightPlayerNameElement.style.backgroundColor = 'yellow';
    rightPlayerNameElement.style.color = 'black';
  } else {
    rightPlayerNameElement.style.backgroundColor = '';
  }
}

//css切り替え
function changestyle(cssid,cssfile) {
   document.getElementById(cssid).href = cssfile;
}


//＝＝＝旧コード
const menuIconElement = document.getElementById('menu-icon');
menuIconElement.addEventListener('click', () => {
  settingModalElement.style.display = 'block';
});

settingFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const leftPlayerName = event.target.elements['leftPlayerName'].value;
  const rightPlayerName = event.target.elements['rightPlayerName'].value;

  leftPlayerNameElement.textContent = leftPlayerName;
  rightPlayerNameElement.textContent = rightPlayerName;

  settingModalElement.style.display = 'none';
});

