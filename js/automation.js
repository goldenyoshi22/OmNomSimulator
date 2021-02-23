function Autobuyer(target, interval, bulk) {
  this.target = target;
  this.interval = interval;
  this.charge = ON(0);
  this.enabled = false;
  this.bulk = bulk;
}
//each interval unit is 50ms
//target: function it executes
//interval: how often it is exucuted, in 50*x ms
//bulk: argument for the function

function autobuyerTick(autobuyer) {
  autobuyer.charge = autobuyer.charge.plus(1);
  //console.log("tick" + autobuyer.charge);

  if (autobuyer.charge.gte(autobuyer.interval) && autobuyer.enabled) {
    autobuyer.target();
    autobuyer.charge = ON(0);
  }
}

function activateAutobuyer(autobuyer) {
  setInterval(autobuyerTick, 50, autobuyer)
  //console.log("activated")
}