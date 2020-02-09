'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var dialogHandler = setup.querySelector('.upload');
  var userNameInput = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var coatColorInput = setup.querySelector('input[name=coat-color]');
  var eyesColorInput = setup.querySelector('input[name=eyes-color]');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input');

  var changeColorElement = function (color, wizardElement, input) {
    var randomColor = window.utils.getRandomElement(color);

    if (wizardElement === wizardFireball) {
      wizardElement.style.backgroundColor = randomColor;
    } else {
      wizardElement.style.fill = randomColor;
    }

    input.value = randomColor;
  };

  var onCoatChangeColor = function () {
    changeColorElement(COAT_COLORS, wizardCoat, coatColorInput);
  };

  var onEyesChangeColor = function () {
    changeColorElement(EYES_COLORS, wizardEyes, eyesColorInput);
  };

  var onFireballChangeColor = function () {
    changeColorElement(FIREBALL_COLORS, wizardFireball, wizardFireballInput);
  };

  var resetSetupDialog = function () {
    setup.style.left = '';
    setup.style.top = '';
  };

  var onPopupEscPress = function (evt) {
    if (evt.target !== userNameInput) {
      window.utils.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.querySelector('.setup-similar').classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    wizardCoat.addEventListener('click', onCoatChangeColor);
    wizardEyes.addEventListener('click', onEyesChangeColor);
    wizardFireball.addEventListener('click', onFireballChangeColor);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.querySelector('.setup-similar').classList.add('hidden');

    resetSetupDialog();

    document.removeEventListener('keydown', onPopupEscPress);
    wizardCoat.removeEventListener('click', onCoatChangeColor);
    wizardEyes.removeEventListener('click', onEyesChangeColor);
    wizardFireball.removeEventListener('click', onFireballChangeColor);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
