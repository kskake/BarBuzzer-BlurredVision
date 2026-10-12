/**
 * Blurred Vision — Game Logic
 * Continuous Gaussian blur that eases from blurStart to a 2px floor.
 */

'use strict';

const ROUND_DURATION_S    = 30;
const BLUR_INITIAL        = 40;
const BLUR_MIN            = 2;
const BLUR_EASE           = 1.4;
const BLUR_TICK_MS        = 100;
const LOCKOUT_DURATION_S  = 5;
const LOCKOUT_PENALTY     = 50;
const SCORE_PER_SECOND    = 10;
const LEADERBOARD_KEY     = 'blurredVision_leaderboard';
const HIGH_SCORE_KEY      = 'blurredVision_highScore';

window.gameState = {
  phase: 'welcome',
  playerName: 'Player 1',
  totalRounds: 10,
  round: 0,
  score: 0,
  timer: ROUND_DURATION_S,
  timerStartedAt: 0,
  blurLevel: BLUR_INITIAL,
  blurStart: BLUR_INITIAL,
  isLockedOut: false,
  lockoutTimer: 0,
  answeredCorrect: false,
  earnedPoints: 0,
  deck: [],
  currentQuestion: null,
  roundLog: [],
  roundLogEntry: null,
  timerInterval: null,
  blurInterval: null,
  lockoutInterval: null,
  imageFailed: false,
};
const state = window.gameState;

const welcomeScreen  = document.getElementById('welcomeScreen');
const gameScreen     = document.getElementById('gameScreen');
const resultScreen   = document.getElementById('resultScreen');
const gameoverScreen = document.getElementById('gameoverScreen');
const playerNameInput = document.getElementById('playerNameInput');
const roundsSelect    = document.getElementById('roundsSelect');
const startBtn        = document.getElementById('startBtn');
const welcomeLbList   = document.getElementById('welcomeLbList');
const welcomeLbEmpty  = document.getElementById('welcomeLbEmpty');
const welcomeHsValue  = document.getElementById('welcomeHsValue');
const hudRound  = document.getElementById('hudRound');
const hudScore  = document.getElementById('hudScore');
const progressFill = document.getElementById('progressFill');
const imageFrame    = document.getElementById('imageFrame');
const gameImage     = document.getElementById('gameImage');
const imageFallback = document.getElementById('imageFallback');
const categoryBadge = document.getElementById('categoryBadge');
const timerOverlay  = document.getElementById('timerOverlay');
const optionsGrid  = document.getElementById('optionsGrid');
const lockoutBar   = document.getElementById('lockoutBar');
const lockoutSecs  = document.getElementById('lockoutSecs');
const scoreFlash = document.getElementById('scoreFlash');
const resultVerdict  = document.getElementById('resultVerdict');
const resultLabel    = document.getElementById('resultLabel');
const resultSub      = document.getElementById('resultSub');
const revealImage    = document.getElementById('revealImage');
const revealFallback = document.getElementById('revealFallback');
const answerLabel    = document.getElementById('answerLabel');
const pointsBadge    = document.getElementById('pointsBadge');
const nextRoundBtn   = document.getElementById('nextRoundBtn');
const gameoverEmoji    = document.getElementById('gameoverEmoji');
const gameoverTitle    = document.getElementById('gameoverTitle');
const gameoverScore    = document.getElementById('gameoverScore');
const gameoverHs       = document.getElementById('gameoverHs');
const newHsBadge       = document.getElementById('newHsBadge');
const gameoverLbList   = document.getElementById('gameoverLbList');
const gameoverLbEmpty  = document.getElementById('gameoverLbEmpty');
const breakdownList    = document.getElementById('breakdownList');
const playAgainBtn     = document.getElementById('playAgainBtn');

function showScreen(screenEl) {
  [welcomeScreen, gameScreen, resultScreen, gameoverScreen].forEach(s => {
    if (s) s.classList.add('hidden');
  });
  if (screenEl) screenEl.classList.remove('hidden');
}

function applyTimerColor(t) {
  let borderColor, glowColor;
  if (t > 20) {
    borderColor = '#32ff00';
    glowColor   = 'rgba(50, 255, 0, 0.3)';
  } else if (t > 10) {
    borderColor = '#ffe033';
    glowColor   = 'rgba(255, 224, 51, 0.3)';
  } else {
    borderColor = '#ff2d55';
    glowColor   = 'rgba(255, 45, 85, 0.35)';
  }
  imageFrame.style.setProperty('--frame-border-color', borderColor);
  imageFrame.style.setProperty('--frame-glow-color',   glowColor);
  timerOverlay.style.setProperty('--frame-border-color', borderColor);
  timerOverlay.style.color = borderColor;
  timerOverlay.style.borderColor = borderColor;
  timerOverlay.style.textShadow = `0 0 8px ${borderColor}`;
}

function setBlur(px) {
  state.blurLevel = px;
  if (!gameImage || state.imageFailed) return;
  gameImage.style.filter = `blur(${px.toFixed(2)}px)`;
}

function computeBlur(timeRemaining) {
  const start = state.blurStart || BLUR_INITIAL;
  if (timeRemaining <= 0) return 0;
  const t = Math.max(0, Math.min(1, timeRemaining / ROUND_DURATION_S));
  return Math.max(BLUR_MIN, start * Math.pow(t, BLUR_EASE));
}

function blurStartFor(question) {
  if (!question) return BLUR_INITIAL;
  if (typeof question.blurStart === 'number') return question.blurStart;
  const cat = question.category || '';
  if (cat === 'Landmarks') return 45;
  if (cat === 'Bar Gear' || cat === 'Sports') return 32;
  return BLUR_INITIAL;
}

function tickBlur() {
  if (state.phase !== 'playing' && state.phase !== 'lockedOut') return;
  const remaining = Math.max(0, ROUND_DURATION_S - (Date.now() - state.timerStartedAt) / 1000);
  setBlur(computeBlur(remaining));
}

function updateProgressBar(t) {
  const pct = (t / ROUND_DURATION_S) * 100;
  progressFill.style.width = pct + '%';
  if (t > 20) {
    progressFill.style.background = 'linear-gradient(90deg, #32ff00, #00ffff)';
    progressFill.style.boxShadow = '0 0 8px rgba(50, 255, 0, 0.5)';
  } else if (t > 10) {
    progressFill.style.background = 'linear-gradient(90deg, #ffe033, #ff9900)';
    progressFill.style.boxShadow = '0 0 8px rgba(255, 224, 51, 0.5)';
  } else {
    progressFill.style.background = 'linear-gradient(90deg, #ff2d55, #ff007f)';
    progressFill.style.boxShadow = '0 0 8px rgba(255, 45, 85, 0.5)';
  }
}

function updateHud() {
  hudRound.textContent = `${state.round} / ${state.totalRounds}`;
  hudScore.textContent = state.score;
}

function renderOptions(question) {
  optionsGrid.innerHTML = '';
  const shuffledOptions = [...question.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  shuffledOptions.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.setAttribute('aria-label', `Answer: ${opt}`);
    btn.addEventListener('click', () => handleAnswer(opt, question));
    optionsGrid.appendChild(btn);
  });
}

function disableAllOptions() {
  optionsGrid.querySelectorAll('.option-btn').forEach(b => (b.disabled = true));
}

function markIncorrect(chosen) {
  optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
    if (btn.textContent === chosen) {
      btn.classList.add('incorrect');
      btn.disabled = true;
    }
  });
}

function revealCorrectAnswer(correct) {
  optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('correct');
    else if (!btn.classList.contains('incorrect')) btn.classList.add('locked');
  });
}

function showScoreFlash(text, color) {
  scoreFlash.textContent = text;
  scoreFlash.style.color = color;
  scoreFlash.classList.remove('show');
  void scoreFlash.offsetWidth;
  scoreFlash.classList.add('show');
}

function startLockout() {
  state.isLockedOut = true;
  state.lockoutTimer = LOCKOUT_DURATION_S;
  state.phase = 'lockedOut';
  lockoutBar.classList.remove('hidden');
  lockoutSecs.textContent = state.lockoutTimer;
  disableAllOptions();
  gameScreen.classList.add('shake');
  gameScreen.addEventListener('animationend', () => gameScreen.classList.remove('shake'), { once: true });
  state.lockoutInterval = setInterval(() => {
    state.lockoutTimer--;
    lockoutSecs.textContent = state.lockoutTimer;
    if (state.lockoutTimer <= 0) {
      clearInterval(state.lockoutInterval);
      state.lockoutInterval = null;
      endLockout();
    }
  }, 1000);
}

function endLockout() {
  state.isLockedOut = false;
  state.phase = 'playing';
  lockoutBar.classList.add('hidden');
  optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
    if (!btn.classList.contains('incorrect')) btn.disabled = false;
  });
}

function handleAnswer(chosen, question) {
  if (state.isLockedOut || state.phase !== 'playing') return;
  const isCorrect = chosen === question.correctAnswer;
  if (isCorrect) {
    const pts = Math.max(0, Math.round(state.timer) * SCORE_PER_SECOND);
    state.score += pts;
    state.earnedPoints = pts;
    state.answeredCorrect = true;
    logRoundResult(question, true, pts);
    stopRoundTimer();
    revealCorrectAnswer(question.correctAnswer);
    showScoreFlash(`+${pts}`, '#32ff00');
    setTimeout(() => showResultScreen(), 900);
  } else {
    const penalty = Math.min(LOCKOUT_PENALTY, state.score);
    state.score = Math.max(0, state.score - penalty);
    state.earnedPoints = -penalty;
    state.answeredCorrect = false;
    logRoundResult(question, false, 0);
    showScoreFlash(penalty > 0 ? `-${penalty}` : '✗', '#ff2d55');
    markIncorrect(chosen);
    startLockout();
  }
  updateHud();
}

function logRoundResult(question, correct, pts) {
  if (state.roundLogEntry) {
    state.roundLogEntry.correct = correct;
    state.roundLogEntry.pts = pts;
  } else {
    state.roundLogEntry = { question, correct, pts };
    state.roundLog.push(state.roundLogEntry);
  }
}

function startRoundTimer() {
  state.timer = ROUND_DURATION_S;
  state.timerStartedAt = Date.now();
  updateProgressBar(state.timer);
  applyTimerColor(state.timer);
  timerOverlay.textContent = state.timer;
  setBlur(state.blurStart);
  state.timerInterval = setInterval(() => {
    const remaining = Math.max(0, ROUND_DURATION_S - (Date.now() - state.timerStartedAt) / 1000);
    state.timer = remaining;
    timerOverlay.textContent = Math.ceil(remaining);
    updateProgressBar(remaining);
    applyTimerColor(remaining);
    if (remaining <= 0) {
      stopRoundTimer();
      onTimerExpired();
    }
  }, 200);
  if (state.blurInterval) clearInterval(state.blurInterval);
  state.blurInterval = setInterval(tickBlur, BLUR_TICK_MS);
}

function stopRoundTimer() {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
  if (state.blurInterval) { clearInterval(state.blurInterval); state.blurInterval = null; }
}

function onTimerExpired() {
  state.answeredCorrect = false;
  state.earnedPoints = 0;
  setBlur(0);
  if (state.isLockedOut) {
    clearInterval(state.lockoutInterval);
    state.lockoutInterval = null;
    state.isLockedOut = false;
    lockoutBar.classList.add('hidden');
  }
  logRoundResult(state.currentQuestion, false, 0);
  revealCorrectAnswer(state.currentQuestion.correctAnswer);
  showResultScreen();
}

function loadQuestion(question) {
  state.currentQuestion = question;
  state.phase = 'playing';
  state.isLockedOut = false;
  state.answeredCorrect = false;
  state.earnedPoints = 0;
  state.roundLogEntry = null;
  state.imageFailed = false;
  state.blurStart = blurStartFor(question);

  imageFrame.classList.remove('image-failed');
  imageFallback.classList.add('hidden');
  imageFallback.textContent = '';
  gameImage.style.display = '';
  gameImage.style.filter = `blur(${state.blurStart}px)`;
  gameImage.src = question.imageUrl;
  gameImage.alt = 'Blurred mystery image';
  gameImage.onload = () => {
    state.imageFailed = false;
    imageFrame.classList.remove('image-failed');
    imageFallback.classList.add('hidden');
    gameImage.style.display = '';
    setBlur(computeBlur(state.timer));
  };
  gameImage.onerror = () => {
    state.imageFailed = true;
    gameImage.style.filter = 'none';
    gameImage.style.display = 'none';
    imageFrame.classList.add('image-failed');
    imageFallback.textContent = 'Image failed to load — guess from the answers';
    imageFallback.classList.remove('hidden');
  };

  categoryBadge.textContent = question.category;
  renderOptions(question);
  lockoutBar.classList.add('hidden');
  setBlur(state.blurStart);
  updateProgressBar(ROUND_DURATION_S);
  applyTimerColor(ROUND_DURATION_S);
  timerOverlay.textContent = ROUND_DURATION_S;
}

function showResultScreen() {
  if (state.lockoutInterval) {
    clearInterval(state.lockoutInterval);
    state.lockoutInterval = null;
  }
  state.phase = 'result';
  showScreen(resultScreen);
  const q = state.currentQuestion;
  const correct = state.answeredCorrect;
  resultVerdict.textContent = correct ? '🎉' : (state.timer <= 0 ? '⏰' : '💀');
  resultLabel.textContent = correct ? 'Correct!' : (state.timer <= 0 ? "Time's Up!" : 'Wrong Answer!');
  resultLabel.style.color = correct ? 'var(--neon-green)' : 'var(--neon-red)';
  resultSub.textContent = correct
    ? `You guessed it with ${Math.ceil(state.timer)}s remaining!`
    : 'Better luck next round.';
  revealFallback.classList.add('hidden');
  revealImage.style.display = '';
  revealImage.src = q.imageUrl;
  revealImage.alt = q.correctAnswer;
  revealImage.onerror = () => {
    revealImage.style.display = 'none';
    revealFallback.textContent = '🖼️';
    revealFallback.classList.remove('hidden');
  };
  answerLabel.textContent = q.correctAnswer;
  const pts = state.earnedPoints;
  if (pts > 0) {
    pointsBadge.textContent = `+${pts} pts`;
    pointsBadge.className = 'points-badge positive';
  } else if (pts < 0) {
    pointsBadge.textContent = `${pts} pts`;
    pointsBadge.className = 'points-badge zero';
    pointsBadge.style.color = 'var(--neon-red)';
  } else {
    pointsBadge.textContent = '0 pts';
    pointsBadge.className = 'points-badge zero';
  }
  nextRoundBtn.textContent = state.round >= state.totalRounds ? '🏆 See Final Score' : '▶ Next Round';
}

function showGameoverScreen() {
  state.phase = 'gameover';
  showScreen(gameoverScreen);
  const score = state.score;
  const maxPossible = state.totalRounds * ROUND_DURATION_S * SCORE_PER_SECOND;
  const pct = maxPossible > 0 ? score / maxPossible : 0;
  let emoji, title;
  if (pct >= 0.75) { emoji = '🏆'; title = 'Eagle Eye!'; }
  else if (pct >= 0.5) { emoji = '🎯'; title = 'Sharp Shooter!'; }
  else if (pct >= 0.25) { emoji = '🔍'; title = 'Getting Warmer!'; }
  else { emoji = '😅'; title = 'Needs More Practice!'; }
  gameoverEmoji.textContent = emoji;
  gameoverTitle.textContent = title;
  gameoverScore.textContent = score;
  const prevHs = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10);
  if (score > prevHs) {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
    newHsBadge.classList.remove('hidden');
  } else {
    newHsBadge.classList.add('hidden');
  }
  gameoverHs.textContent = `High score: ${Math.max(prevHs, score)}`;
  saveToLeaderboard(state.playerName, score);
  renderLeaderboard(gameoverLbList, gameoverLbEmpty);
  renderBreakdown();
}

function renderBreakdown() {
  if (!breakdownList) return;
  breakdownList.innerHTML = '';
  state.roundLog.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'breakdown-row';
    const qName = entry.question ? entry.question.correctAnswer : `Round ${i + 1}`;
    const ptsClass = entry.pts > 0 ? 'pos' : (entry.correct ? 'zero' : 'neg');
    row.innerHTML = `<span class="breakdown-q">${i + 1}. ${qName}</span><span class="breakdown-pts ${ptsClass}">${entry.pts > 0 ? '+' : ''}${entry.pts}</span>`;
    breakdownList.appendChild(row);
  });
}

function saveToLeaderboard(name, score) {
  let board = [];
  try { board = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]'); } catch (e) { board = []; }
  board.push({ name: name || 'Player', score, at: Date.now() });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board.slice(0, 8)));
}

function renderLeaderboard(listEl, emptyEl) {
  if (!listEl) return;
  let board = [];
  try { board = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]'); } catch (e) { board = []; }
  listEl.innerHTML = '';
  if (!board.length) { if (emptyEl) emptyEl.classList.remove('hidden'); return; }
  if (emptyEl) emptyEl.classList.add('hidden');
  const medals = ['gold', 'silver', 'bronze'];
  board.forEach((row, i) => {
    const li = document.createElement('li');
    li.className = 'lb-item';
    const rankClass = medals[i] ? `lb-rank ${medals[i]}` : 'lb-rank';
    li.innerHTML = `<span class="${rankClass}">${i + 1}</span><span class="lb-name">${row.name}</span><span class="lb-score">${row.score}</span>`;
    listEl.appendChild(li);
  });
}

function startGame() {
  const name = (playerNameInput && playerNameInput.value.trim()) || 'Player 1';
  const rounds = parseInt(roundsSelect && roundsSelect.value ? roundsSelect.value : '10', 10);
  state.playerName = name;
  state.totalRounds = rounds;
  state.round = 0;
  state.score = 0;
  state.roundLog = [];
  state.deck = (typeof buildDeck === 'function') ? buildDeck(rounds) : [];
  nextRound();
}

function nextRound() {
  if (state.round >= state.totalRounds) { showGameoverScreen(); return; }
  state.round++;
  const q = state.deck[state.round - 1];
  if (!q) { showGameoverScreen(); return; }
  showScreen(gameScreen);
  loadQuestion(q);
  updateHud();
  startRoundTimer();
}

function init() {
  if (welcomeHsValue) welcomeHsValue.textContent = localStorage.getItem(HIGH_SCORE_KEY) || '0';
  renderLeaderboard(welcomeLbList, welcomeLbEmpty);
  if (startBtn) startBtn.addEventListener('click', startGame);
  if (nextRoundBtn) nextRoundBtn.addEventListener('click', nextRound);
  if (playAgainBtn) playAgainBtn.addEventListener('click', () => {
    showScreen(welcomeScreen);
    if (welcomeHsValue) welcomeHsValue.textContent = localStorage.getItem(HIGH_SCORE_KEY) || '0';
    renderLeaderboard(welcomeLbList, welcomeLbEmpty);
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
