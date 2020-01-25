'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomWizard = function () {
  var wizard =
  {
    name: WIZARD_NAMES[getRandomElement(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomElement(WIZARD_SURNAMES)],
    coatColor: COAT_COLORS[getRandomElement(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRandomElement(EYES_COLORS)]
  };

  return wizard;
};

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = getRandomWizard().name;
  wizardElement.querySelector('.wizard-coat').style.fill = getRandomWizard().coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandomWizard().eyesColor;

  return wizardElement;
};

var renderAllWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards; i++) {
    fragment.appendChild(renderWizard());
  }

  similarListElement.appendChild(fragment);
};

renderAllWizards(WIZARD_QUANTITY);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
