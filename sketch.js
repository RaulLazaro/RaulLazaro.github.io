var simplex = new SimplexNoise();
var d = 2;
var col = [[0, 255, 255], [0, 204, 255], [0, 153, 255], [0, 102, 255], [0, 51, 255], [0, 0, 255], [0, 0, 229], [0, 0, 178], [0, 0, 127], [0, 0, 76]];
var slider;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(d);
    paper();
}

function paper() {
    loadPixels();
    for (var x = 0; x < width * d; x++) {
        for (var y = 0; y < height * d; y++) {
            var index = (x + y * width * d) * 4;
            var n = simplex.noise2D(3 * x / 1000, 3 * y / 1000) * 0.5 + 0.5;
            n = Math.round(n * 9);
            pixels[index + 0] = col[n][0];       //r
            pixels[index + 1] = col[n][1];       //g
            pixels[index + 2] = col[n][2];       //b
            pixels[index + 3] = 255;
        }
    }
    updatePixels();
}

function refresh() {
    simplex = new SimplexNoise();
    paper();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    paper()
}
