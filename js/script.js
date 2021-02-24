
var ON = OmegaNum;

var game = {
candy: ON(0),
candygain: ON(1),
candylog: ON(10),
upgradecosts: [ON(10), ON(20), ON(25), ON(42), ON(77), ON(100), ON(123), ON(150), ON(177), ON(200)],
upgrades: [false, false, false, false, false, false, false, false, false, false],
time: 5,
timebonus: 1,
percent: 0,
tab: 1,
eatsound: true,
notation: 1,
autoclick: new Autobuyer(searchchecksinceautobuyerisstupid, (40*1.33333333333333), ON(1)),
autoclickLevel: ON(0),
autocost: ON(20),
currentTime: Date.now(),
showthing: true
}

var notationnames = ["Scientific", "Logarithm"]
var searchable = true

function init() {
setInterval(save, 2222)
load();
if (game.showthing == true) {$.notify('It is recommended to play this in 100% size, check this by pressing ctrl++ and ctrl+-. I don\'t know how it works on mobile though.', 'info'); game.showthing = false;}
percent = 0	
//setInterval(updateValues, 200)
setInterval(update, 50)
updateAuto()
activateAutobuyer(game.autoclick)
}

init();

game.percent = 0;

function searchchecksinceautobuyerisstupid() {
if (searchable) {searchable = false; search();}
}

function update() {
if (Date.now() - game.currentTime >= 10000)  {
$.notify(`While you were offline / offwindowed, Om Nom found ${notation(ON.div((Date.now() - game.currentTime), 20000).mul(game.candygain.div(2).ceil()).mul(game.autoclickLevel.plus(1)))} candy. (Offline time: ${displayTime(Math.floor(((Date.now() - game.currentTime) / 1000)))})`, 'info');
game.candy = game.candy.plus(toFixed(ON.div((Date.now() - game.currentTime), 20000).mul(game.candygain.div(2).ceil()).mul(game.autoclickLevel.plus(1))), 2)
}
game.currentTime = Date.now()
}

function updateValues() {
game.time = (5 / toFixed(ON.logBase(game.candy.plus(1), game.candylog).plus(1), 2).toNumber()) / game,timebonus
}

function updateAuto() {
  if (game.autoclickLevel.gte(1)) game.autoclick.enabled = true;
  else game.autoclick.enabled = false;
}

function buyAutobuyer() {
if (game.autoclickLevel.lt(11) && game.candy.gte(game.autocost)) {
game.candy = game.candy.minus(game.autocost);
game.autoclickLevel = game.autoclickLevel.plus(1)
game.autoclick.interval = Math.floor(game.autoclick.interval / 1.33333333333333)
game.autocost = game.autocost.times(1.25)

updateAuto();
}
}

var eat = new Audio('eat.mp3');

function search() {
game.time = (5 / toFixed(ON.logBase(game.candy.plus(1), game.candylog).plus(1), 2).toNumber()) / game.timebonus
var searchtime = game.time
var makethisnotabovehundredcheck = false
var interval = setInterval(function() {
if (searchtime > 0) {
searchtime-= (game.upgrades[4] ? 0.066666666666 : 0.05);
if (game.candygain.gte(2) && (makethisnotabovehundredcheck || game.upgrades[4])) game.candy = toFixed(game.candy.plus(ON.div(1, game.candygain).div(20).div(ON(1).div(ON.logBase(game.candy.plus(1), game.candylog).plus(1)))), 2)
if (makethisnotabovehundredcheck == false) {makethisnotabovehundredcheck = true}
else {game.percent = parseFloat((parseFloat(game.percent) + parseFloat((1/(game.time/5)).toFixed(2))).toFixed(2));}
} else {
clearInterval(interval);
searchable = true;
game.percent = 0;
if (game.eatsound && game.time > 2) eat.play()
game.candy = game.candy.plus(1)
if (game.time > 2) $.notify('Candy has been found.', 'success')
}
}, 50)
}

function toFixed(num, dec = 2) {
	return ON.round(num.times(ON.pow(10, dec))).div(ON.pow(10, dec));
}



function upgrade(n, func = (console.log('bruh'))) {
if (game.candy.gte(game.upgradecosts[n]) && game.upgrades[n] == false) {
	game.candy = game.candy.minus(game.upgradecosts[n]);
	game.upgrades[n] = true;
	() => func;
	$.notify('Upgrade bought.', 'success')
} else $.notify('Not enough candy!', 'error')
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

function displayTime(d) {
    d = Number(d);
	var day = Math.floor(d / 86400)
    var h = Math.floor(d % 86400 / 3600);
    var m = Math.floor(d % 86400 % 3600 / 60);
    var s = Math.floor(d % 86400 % 3600 % 60);
    
	var dDisplay = day > 0 ? day + (day == 1 ? " day, " : " days, ") : ""
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay; 
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