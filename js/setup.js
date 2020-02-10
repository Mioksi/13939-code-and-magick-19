'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;

  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createWizardsArray = function (wizardsQuantity) {
    var wizards = [];

    for (var i = 0; i < wizardsQuantity; i++) {
      var wizard = window.data.generateWizard(i);

      wizards.push(wizard);
    }

    return wizards;
  };

  var wizards = createWizardsArray(WIZARDS_QUANTITY);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderAllWizards = function (wizardsQuantity) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsQuantity; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  renderAllWizards(WIZARDS_QUANTITY);
})();
