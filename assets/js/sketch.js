var simplex = new SimplexNoise();
var d = 2;
var col = [
  [0, 255, 255],
  [0, 204, 255],
  [0, 153, 255],
  [0, 102, 255],
  [0, 51, 255],
  [0, 0, 255],
  [0, 0, 229],
  [0, 0, 178],
  [0, 0, 127],
  [0, 0, 76]
];
var inputColor = [];

function setup() {
  createCanvas(windowWidth, windowHeight + 100);
  pixelDensity(d);

  if (localStorage.getItem("mode") === null)
    matchMedia("(prefers-color-scheme: dark)").matches
      ? darkMode()
      : lightMode();
  else localStorage.getItem("mode") === "dark" ? darkMode() : lightMode();
}

function paper() {
  loadPixels();
  for (var x = 0; x < width * d; x++) {
    for (var y = 0; y < height * d; y++) {
      var index = (x + y * width * d) * 4;
      var n = simplex.noise2D((3 * x) / 1000, (3 * y) / 1000) * 0.5 + 0.5;
      n = Math.round(n * 9);
      pixels[index + 0] = col[n][0]; //r
      pixels[index + 1] = col[n][1]; //g
      pixels[index + 2] = col[n][2]; //b
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}

function menu(x) {
  var y = document.getElementById("menu");
  if (y.className === "inactive") {
    y.className = "flex-v active animated fadeInRight";
    x.className = "fas fa-times fa-2x";
  } else {
    y.className = "inactive";
    x.className = "fas fa-bars fa-2x";
  }
  if (inputColor[0]) {
    customModeClose();
  }
}

function lightMode() {
  var color = 255;
  if (inputColor[0]) {
    customModeClose();
  }
  for (var i = 0; i < 10; i++) {
    col[i][0] = color;
    col[i][1] = color;
    col[i][2] = color;
    color = color - 10;
  }
  paper();
  localStorage.setItem("mode", "light");
  document.querySelector("body").classList.remove("dark");
}

function darkMode() {
  var color = 0;
  if (inputColor[0]) {
    customModeClose();
  }
  for (var i = 0; i < 10; i++) {
    col[i][0] = color;
    col[i][1] = color;
    col[i][2] = color;
    color = color + 10;
  }
  paper();
  localStorage.setItem("mode", "dark");
  document.querySelector("body").classList.add("dark");
}
//cambiar a escala de un color y que se guarde entre sesiones
function randomMode() {
  if (inputColor[0]) {
    customModeClose();
  }
  for (var i = 0; i < 10; i++) {
    col[i][0] = Math.round(random(255));
    col[i][1] = Math.round(random(255));
    col[i][2] = Math.round(random(255));
  }
  paper();
}
//guardar combinacion entre sesiones
function customModeOpen() {
  for (var i = 0; i < 10; i++) {
    inputColor[i] = createInput(
      "#" + hex(col[i][0], 2) + hex(col[i][1], 2) + hex(col[i][2], 2),
      "color"
    );
    inputColor[i].parent("customColor");
  }
  document.getElementById("custom").onclick = customModeClose;
  for (var i = 0; i < 10; i++) {
    inputColor[i].input(update);
  }
}

function update() {
  for (var i = 0; i < 10; i++) {
    var c = color(inputColor[i].value());
    col[i][0] = red(c);
    col[i][1] = green(c);
    col[i][2] = blue(c);
  }
  paper();
}

function customModeClose() {
  for (var i = 0; i < 10; i++) {
    inputColor[i].remove();
  }
  document.getElementById("custom").onclick = customModeOpen;
}

function refresh() {
  simplex = new SimplexNoise();
  paper();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight + 100);
  paper();
}
