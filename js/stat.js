'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 50;
var GAP_Y = 10;
var TEXT_GAP = 30;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomBlue = function () {
  return 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var offsetX = CLOUD_X + GAP + (BAR_WIDTH + GAP) * i;
    var barHeight = BAR_HEIGHT * Math.round(times[i]) / maxTime;

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], offsetX, CLOUD_HEIGHT - GAP_Y);
    ctx.fillText(Math.round(times[i]), offsetX, CLOUD_HEIGHT - TEXT_GAP - GAP_Y - barHeight);

    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomBlue();
    ctx.fillRect(offsetX, CLOUD_HEIGHT - barHeight - GAP_Y - FONT_GAP, BAR_WIDTH, barHeight);
  }
};
