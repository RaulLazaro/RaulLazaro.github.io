var simplex = new SimplexNoise();
var t = 0;

function setup() {
    createCanvas(400, 400);
    noStroke();
    pixelDensity(1);
    frameRate(15);
}

function draw() {
    console.time('loop');
    for (var x = 0; x < width; x += 20) {
        for (var y = 0; y < height; y += 20) {
            var c = simplex.noise3D(0.02 * x/width, 0.02 * y/height, t)* 0.5 + 0.5;
            fill(c * 0, c * 0, c * 255);
            rect(x, y, 20, 20);
        }
    }
    t += 0.01;

    canvas = document.getElementById('defaultCanvas0');
    StackBlur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, 36);
    filter(POSTERIZE, 20);
    document.getElementById('defaultCanvas0').style.width = "100%";
    document.getElementById('defaultCanvas0').style.height = "100%";
    console.timeEnd('loop');
}

//function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
//}
