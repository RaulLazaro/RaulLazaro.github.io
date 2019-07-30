var canvas;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    //pixelDensity(1);
}

function draw() {
    loadPixels();
    let d = pixelDensity();
    for (let x = 0; x < windowWidth; x++) {
        for (let y = 0; y < windowHeight; y++) {
            for (let i = 0; i < d; i++) {
                for (let j = 0; j < d; j++) {
                    let n = noise(x / 40, y / 40, frameCount / 20) * 255;
                    let idx = 4 * ((y * d + j) * windowWidth * d + (x * d + i));
                    pixels[idx] = n;        //r
                    pixels[idx + 1] = n;    //g
                    pixels[idx + 2] = n;    //b
                    pixels[idx + 3] = 255;  //a
                }
            }
        }
    }
    updatePixels();
}