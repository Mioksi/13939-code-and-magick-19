'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var setup = document.querySelector('.setup');
  var similar = setup.querySelector('.setup-similar');

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var wizardsCopy = wizards.slice();

    window.render.wizards(wizardsCopy.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onColorChange = window.debounce(function (color) {
    coatColor = color;
    eyesColor = color;

    updateWizards();
  });

  var onSuccess = function (data) {
    wizards = data;

    updateWizards();

    similar.classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);

  window.similar = {
    onError: onError,
    onColorChange: onColorChange
  };
})();
