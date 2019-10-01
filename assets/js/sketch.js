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

  if (localStorage.getItem("color") !== null && localStorage.getItem("color") !== "") {
    col = JSON.parse(localStorage.getItem("color"));
    localStorage.getItem("mode") === "dark"
      ? document.querySelector("body").classList.add("dark")
      : document.querySelector("body").classList.remove("dark");
    paper();
  } else {
    if (localStorage.getItem("mode") === null)
      matchMedia("(prefers-color-scheme: dark)").matches
        ? darkMode()
        : lightMode();
    else localStorage.getItem("mode") === "dark" ? darkMode() : lightMode();
  }
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
  localStorage.setItem("color", "");
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
  localStorage.setItem("color", "");
  document.querySelector("body").classList.add("dark");
}

function randomMode() {
  if (inputColor[0]) {
    customModeClose();
  }
  do {
    col1 = [
      Math.round(random(255)),
      Math.round(random(255)),
      Math.round(random(255))
    ];
    col2 = [
      Math.round(random(255)),
      Math.round(random(255)),
      Math.round(random(255))
    ];
    bri1 = ((col1[0] * 299)+(col1[1] * 587)+(col1[2] * 114))/1000;
    bri2 = ((col2[0] * 299)+(col2[1] * 587)+(col2[2] * 114))/1000;
    dif = [
      (col1[0] - col2[0]) / 9,
      (col1[1] - col2[1]) / 9,
      (col1[2] - col2[2]) / 9
    ];
  } while (
    Math.abs(bri1-bri2) < 75
  );

  for (var i = 0; i < 10; i++) {
    col[i][0] = Math.round(col1[0] - dif[0] * i);
    col[i][1] = Math.round(col1[1] - dif[1] * i);
    col[i][2] = Math.round(col1[2] - dif[2] * i);
  }
  paper();
  localStorage.setItem("color", JSON.stringify(col));
}

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
  localStorage.setItem("color", JSON.stringify(col));
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

function load_disqus() {
  // Prepare the trigger and target
  var disqus_target = document.getElementById('disqus_thread');

  // Load script asynchronously only when the trigger and target exist
  if (disqus_target) {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
          s = d.createElement("script");
      s.src = "https://raullazaro.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
  }
}

load_disqus()
