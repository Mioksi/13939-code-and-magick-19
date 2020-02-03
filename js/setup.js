'use strict';

var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var wizards = [];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var coatColorInput = setup.querySelector('input[name=coat-color]');
var eyesColorInput = setup.querySelector('input[name=eyes-color]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballInput = wizardFireball.querySelector('input');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createWizardsArray = function (wizardsQuantity) {
  for (var i = 0; i < wizardsQuantity; i++) {
    var wizard = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };

    wizards.push(wizard);
  }
};

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

var onCoatChangeColor = function () {
  var randomCoatColor = getRandomElement(COAT_COLORS);

  wizardCoat.style.fill = randomCoatColor;
  coatColorInput.value = randomCoatColor;
};

var onEyesChangeColor = function () {
  var randomEyesColor = getRandomElement(EYES_COLORS);

  wizardEyes.style.fill = randomEyesColor;
  eyesColorInput.value = randomEyesColor;
};

var onFireballChangeColor = function () {
  var randomFireballColor = getRandomElement(FIREBALL_COLORS);

  wizardFireball.style.backgroundColor = randomFireballColor;
  wizardFireballInput.value = randomFireballColor;
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target !== userNameInput) {
    closePopup();
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

  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', onCoatChangeColor);
  wizardEyes.removeEventListener('click', onEyesChangeColor);
  wizardFireball.removeEventListener('click', onFireballChangeColor);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

createWizardsArray(WIZARDS_QUANTITY);
renderAllWizards(WIZARDS_QUANTITY);
