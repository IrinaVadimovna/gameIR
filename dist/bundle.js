/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./script/index.js ***!
  \*************************/
var numberLevel = document.querySelectorAll('.number-level');
var startButton = document.querySelector('.start-button');
var centerPlay = document.querySelector('.center');
var headerPlay = document.querySelector('.header_play');
var main = document.querySelector('.main');
var cards = document.querySelectorAll('.memory-card');
var backFace = document.querySelectorAll('.back-face');
var errorBlock = document.querySelectorAll('.error_block');
var timerTime = document.querySelector('.timer_time');
var timeStatus = document.querySelector('.time_status');
var mainScreen = '<header class="header_play header_none"><div class="timer timer_block"><div class="timer_name timer"><p class="timer timer_name">min</p><p class="timer timer_name">sek</p></div><p class="timer_time">00.00</p></div></header><div class="error_block"></div><section class="center play"><div class="screen"><h1 class="screen-title">Выбери сложность</h1><div class="level"><div class="number-level" data-level="simply"><p class="level-text">1</p></div><div class="number-level" data-level="middle"><p class="level-text">2</p></div><div class="number-level" data-level="hard"><p class="level-text">3</p></div></div><p class="text">*Вы сможете допустить 3 ошибки</p><button class="start-button">Старт</button></div></section>';
var winScreen = '<section class="center play"><div class="screen"><img class="img_status" src="./img/win.svg" alt="победа"><h1 class="screen-title status_title">Вы выиграли!</h1><p class="time_status">Затраченное время:</p><p class="time_status time"></p><button class="start-button again-button">Играть снова</button></div></section>';
var lossScreen = '<section class="center play"><div class="screen"><img class="img_status" src="./img/loss.svg" alt="проигрыш"><h1 class="screen-title status_title">Вы проиграли!</h1><p class="time_status">Затраченное время:</p><p class="time_status time"></p><button class="start-button again-button">Играть снова</button></div></section>';

function renderBlock(blockName, container) {
  blockName.innerHTML = container;
}

function variantLevel() {
  var numberLevel = document.querySelectorAll('.number-level');

  var _loop = function _loop(i) {
    var levelButton = numberLevel[i];
    levelButton.addEventListener('click', function () {
      var level = this.getAttribute('data-level');
      numberLevel[i].style.border = '2px solid #ffff';
      window.level = level;
    });
  };

  for (var i = 0; i < numberLevel.length; i++) {
    _loop(i);
  }
}

variantLevel();
startButton.addEventListener('click', function () {
  function startGame() {
    if (window.level === undefined) {
      for (var i = 0; i < numberLevel.length; i++) {
        numberLevel[i].style.border = '2px solid #CD5C5C';
      }
    }

    if (window.level !== undefined) {
      headerPlay.classList.remove('header_none');
      var againButton = document.createElement('button');
      againButton.classList.add('start-button');
      againButton.classList.add('again-button');
      againButton.textContent = 'Начать заново';
      headerPlay.appendChild(againButton);

      if (window.level === 'simply') {
        var playCart = '';

        for (var _i = 1; _i <= 3; _i++) {
          var rund = Math.floor(Math.random() * Object.keys(cart).length) + 1;
          playCart += cart[rund];
        }

        renderBlock(centerPlay, playCart);
        intervalID = setInterval(timer, 1000);
        povCard();
        setTimeout(showCard, 5000);
      }

      if (window.level === 'middle') {
        var _playCart = '';

        for (var _i2 = 1; _i2 <= 6; _i2++) {
          var _rund = Math.floor(Math.random() * Object.keys(cart).length) + 1;

          _playCart += cart[_rund];
        }

        renderBlock(centerPlay, _playCart);
        intervalID = setInterval(timer, 1000);
        povCard();
        setTimeout(showCard, 5000);
      }

      if (window.level === 'hard') {
        var _playCart2 = '';

        for (var _i3 = 1; _i3 <= 9; _i3++) {
          var _rund2 = Math.floor(Math.random() * Object.keys(cart).length) + 1;

          _playCart2 += cart[_rund2];
        }

        renderBlock(centerPlay, _playCart2);
        intervalID = setInterval(timer, 1000);
        povCard();
        setTimeout(showCard, 5000);
      }

      againButton.addEventListener('click', function () {
        clearInterval(intervalID);
        renderBlock(main, mainScreen);
        window.level = '';
        variantLevel();
        var startButton = document.querySelector('.start-button');
        startButton.addEventListener('click', function () {
          var numberLevel = document.querySelectorAll('.number-level');

          if (window.level === '') {
            for (var _i4 = 0; _i4 < numberLevel.length; _i4++) {
              numberLevel[_i4].style.border = '2px solid #CD5C5C';
            }
          }

          if (window.level !== '') {
            newGame();
          }
        });
      });
    }
  }

  startGame();
});

function povCard() {
  var cards = document.querySelectorAll('.memory-card');
  var hasFlippedCard = false;
  var lockBoard = false;
  var firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
  }

  function checkForMatch() {
    var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  var win = 0;

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    win++;

    if (win === 3 && window.level === 'simply') {
      renderBlock(main, winScreen);

      var _timeStatus = document.querySelector('.time_status');

      _timeStatus.innerHTML = window.timeGame;
      clearInterval(intervalID);
      againGame();
    }

    if (win === 6 && window.level === 'middle') {
      renderBlock(main, winScreen);

      var _timeStatus2 = document.querySelector('.time_status');

      _timeStatus2.innerHTML = window.timeGame;
      clearInterval(intervalID);
      againGame();
    }

    if (win === 9 && window.level === 'hard') {
      renderBlock(main, winScreen);

      var _timeStatus3 = document.querySelector('.time_status');

      _timeStatus3.innerHTML = window.timeGame;
      clearInterval(intervalID);
      againGame();
    }
  }

  var counter = 0;

  function unflipCards() {
    counter += 1;

    if (counter === 3) {
      renderBlock(main, lossScreen);
      clearInterval(intervalID);

      var _timeStatus4 = document.querySelector('.time_status');

      _timeStatus4.innerHTML = window.timeGame;
      againGame();
    }

    lockBoard = true;
    setTimeout(function () {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      lockBoard = false;
    }, 500);
  }

  (function shuffle() {
    cards.forEach(function (card) {
      var ramdomPos = Math.floor(Math.random() * 18);
      card.style.order = ramdomPos;
    });
  })();

  cards.forEach(function (card) {
    return card.addEventListener('click', flipCard);
  });
}

function showCard() {
  var front = document.querySelectorAll('.front-face');

  for (var f = 0; f < front.length; f++) {
    front[f].classList.remove('front-face');
    front[f].classList.add('new-front-face');
  }

  var back = document.querySelectorAll('.back-face');

  for (var b = 0; b < back.length; b++) {
    back[b].classList.remove('back-face');
    back[b].classList.add('new-back-face');
  }
}

var sek = 0;
var min = 0;

function timer() {
  sek += 1;

  if (sek === 60) {
    sek = 0;
    min += 1;
  }

  var timeGame = "0".concat(min, ".").concat(sek);
  timerTime.innerHTML = timeGame;
  window.timeGame = timeGame;
} //почему значения таймера не выводятся на экран игры после начала новой игры
/******/ })()
;
//# sourceMappingURL=bundle.js.map