
var ON = OmegaNum;

var game = {
candy: ON(0),
candygain: ON(1),
candylog: ON(10),
upgradecosts: [ON(10), ON(20), ON(25)],
upgrades: [false, false, false],
time: 5,
timebonus: 1,
percent: 0,
tab: 1,
eatsound: true,
notation: 1,
}
var notationnames = ["Scientific", "Logarithm"]
var searchable = true

function init() {
setInterval(save, 2222)
load();
$.notify('It is recommended to play this in 100% size, check this by pressing ctrl++ and ctrl+-. I don\'t know how it works on mobile though.', 'info');
percent = 0	
//setInterval(updateValues, 200)
}

init();

function updateValues() {
game.time = (5 / toFixed(ON.logBase(game.candy.plus(1), game.candylog).plus(1), 2).toNumber()) / game,timebonus
}

var eat = new Audio('eat.mp3');

function search() {
game.time = (5 / toFixed(ON.logBase(game.candy.plus(1), game.candylog).plus(1), 2).toNumber()) / game.timebonus
var searchtime = game.time
var makethisnotabovehundredcheck = false
var interval = setInterval(function() {
if (searchtime > 0) {
searchtime-=0.05;
if (game.candygain.gte(2) && makethisnotabovehundredcheck == true) game.candy = toFixed(game.candy.plus(ON.div(1, game.candygain).div(20).div(ON.div(5, game.time))), 2)
if (makethisnotabovehundredcheck == false) {makethisnotabovehundredcheck = true}
else {game.percent = parseFloat((parseFloat(game.percent) + parseFloat((1/(game.time/5)).toFixed(2))).toFixed(2));}
} else {
clearInterval(interval);
searchable = true;
game.percent = 0;
if (game.eatsound) eat.play()
game.candy = game.candy.plus(1)
if (game.time > 2) $.notify('Candy has been found.', 'success')
}
}, 50)
}

function toFixed(num, dec = 2) {
	return ON.round(num.times(ON.pow(10, dec))).div(ON.pow(10, dec));
}

function upgrade(n) {
switch (n) {
case 0: {
if (game.candy.gte(game.upgradecosts[0]) && game.upgrades[0] == false) {
	game.candy = game.candy.minus(game.upgradecosts[0]);
	game.upgrades[0] = true;
	game.candygain = ON(5)
	$.notify('Upgrade bought.', 'success')
} else {$.notify('Not enough candy!', 'error')}
break;
}
case 1: {
if (game.candy.gte(game.upgradecosts[1]) && game.upgrades[1] == false) {
	game.candy = game.candy.minus(game.upgradecosts[1]);
	game.upgrades[1] = true;
	game.candylog = ON(7.5)
	$.notify('Upgrade bought.', 'success')
} else {$.notify('Not enough candy!', 'error')}
break;
}
case 2: {
if (game.candy.gte(game.upgradecosts[2]) && game.upgrades[2] == false) {
	game.candy = game.candy.minus(game.upgradecosts[2]);
	game.upgrades[2] = true;
	game.timebonus = 2;
	$.notify('Upgrade bought.', 'success')
} else {$.notify('Not enough candy!', 'error')}
break;
}
}
}

function notation(num, not = game.notation) {
if (num.Array == undefined) num = OmegaNum(num)
const e = num.logBase(10).floor();
const m = num.div(OmegaNum.pow(10, e)).times(OmegaNum.pow(10, 2)).floor().div(OmegaNum.pow(10, 2));

switch (not) {
case 1: {	
if (num.lt(10)) return toFixed(num, 2);
if (num.gte(10) && num.lt(100)) return toFixed(num, 1);
if (num.gte(100) && num.lt(1000)) return toFixed(num, 0);
if (num.gte(1000) && num.lt(1e6)) return toFixed(num, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
if (num.gte(1e6) && num.lt("1e1000")) return `${m}e${e}`;
if (num.gte("1e1000")) return (
      "e" +
      toFixed(ON.pow(
        10,
        ON.logBase(num, 10).logBase(10).toNumber() - ON.floor(num.logBase(10).logBase(10)).toNumber()
      )) +
      "e" +
      ON.floor(num.logBase(10).logBase(10))
    );
	break;
}
case 2: {	
if (num.lt(10)) return toFixed(num, 2);
if (num.gte(10) && num.lt(100)) return toFixed(num, 1);
if (num.gte(100) && num.lt(1000)) return toFixed(num, 0);
if (num.gte(1000) && num.lt(1e6)) return toFixed(num, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
if (num.gte(1e6) && num.lt("1e1000")) return `e${toFixed(ON.logBase(num, 10), 2)}`;
if (num.gte("1e1000")) return (
      `ee${toFixed(ON.logBase(num, 10).logBase(10), 2)}`
    );
	break;
}
}
}

function switchNotation() {
	if (game.notation == notationnames.length) game.notation = 1 
	else game.notation += 1
}

var app = new Vue({
  el: '#vue',
  data: {
	game,
	ON,
	toString,
	toFixed,
	notation,
	notationnames,
  }
})