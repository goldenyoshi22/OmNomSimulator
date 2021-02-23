function objectToDecimal(object) {
    for (let i in object) {
        if (typeof(object[i]) == "string" && new OmegaNum(object[i]) instanceof OmegaNum && !(new OmegaNum(object[i]).sign == 0 && object[i] != "0")) {
          object[i] = new OmegaNum(object[i]);
        }
        if (typeof(object[i]) == "object") {
            objectToDecimal(object[i]);
        }
    }
}

function merge(base, source) {
    for (let i in base) {
        if (source[i] != undefined) {
            if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
                merge(base[i], source[i]);
            } else {
                if (isDecimal(base[i]) && !isDecimal(source[i])) {
                    base[i] = new OmegaNum(source[i]);
                } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
                    base[i] = source[i].toNumber();
                } else {
                    base[i] = source[i];
                }
            }
        }
    }
}


function isDecimal(x) {
    if (x instanceof OmegaNum) {
        return true;
    } else {
        return false;
    }
}


var savegame;

function save() {
  localStorage.setItem("OmNomSim", JSON.stringify(game));
}

function load() {
  if (localStorage.getItem("OmNomSim")) {
    savegame = JSON.parse(localStorage.getItem("OmNomSim"));
    objectToDecimal(savegame);
    merge(game, savegame);
  }
}

function wipeSave() {
	importSave('eyJjYW5keSI6eyJhcnJheSI6WzBdLCJzaWduIjoxfSwiY2FuZHlnYWluIjp7ImFycmF5IjpbMV0sInNpZ24iOjF9LCJjYW5keWxvZyI6eyJhcnJheSI6WzEwXSwic2lnbiI6MX0sInVwZ3JhZGVjb3N0cyI6W3siYXJyYXkiOlsxMF0sInNpZ24iOjF9LHsiYXJyYXkiOlsyMF0sInNpZ24iOjF9LHsiYXJyYXkiOlsyNV0sInNpZ24iOjF9LHsiYXJyYXkiOls0Ml0sInNpZ24iOjF9XSwidXBncmFkZXMiOltmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sInRpbWUiOjUsInRpbWVib251cyI6MSwicGVyY2VudCI6MCwidGFiIjoyLCJlYXRzb3VuZCI6dHJ1ZSwibm90YXRpb24iOjEsImF1dG9jbGljayI6eyJpbnRlcnZhbCI6NTMuMzMzMzMzMzMzMzMzMiwiY2hhcmdlIjp7ImFycmF5IjpbMF0sInNpZ24iOjF9LCJlbmFibGVkIjpmYWxzZSwiYnVsayI6eyJhcnJheSI6WzFdLCJzaWduIjoxfX0sImF1dG9jbGlja0xldmVsIjp7ImFycmF5IjpbMF0sInNpZ24iOjF9LCJhdXRvY29zdCI6eyJhcnJheSI6WzIwXSwic2lnbiI6MX0sImNhbmR1Z2FpbiI6eyJhcnJheSI6WzFdLCJzaWduIjoxfX0===')
//https://gist.github.com/mcenirm/4165198
{var w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }}
  save();
  load();
  location.reload(false)
}

function exportSave() {
  return btoa(JSON.stringify(game));
}

function importSave(text) {
  savegame = JSON.parse(atob(text));
  objectToDecimal(savegame);
  merge(game, savegame);
  
  save();
}