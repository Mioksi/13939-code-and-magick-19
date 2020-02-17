'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;

  var setup = document.querySelector('.setup');
  var similarList = setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderAllWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    similarList.innerHTML = '';

    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarList.appendChild(fragment);
  };

  window.render = {
    wizards: renderAllWizards
  };
})();
