// var simplex = new SimplexNoise(),
//     canvas = document.getElementById('c'),
//     ctx = canvas.getContext('2d'),
//     imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height),
//     data = imgdata.data,
//     t = 0;

var t = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    frameRate(15);
}

function draw() {
    for (var x = 0; x < width; x+=20) {
		for (var y = 0; y < height; y+=20) {
			var c = noise(0.02 * x, 0.02 * y, t);
			fill(c * 0, c * 0, c * 255);
			rect(x, y, 20, 20);
		}		
      }
    t += 0.01;

    canvas = document.getElementById('defaultCanvas0');
    StackBlur.canvasRGB(canvas, 0, 0, width-0.25 *4, height-0.25 *4, 36);
    filter(POSTERIZE, 20);
}

function blur() {
    canvas = document.getElementById('defaultCanvas0');
    StackBlur.canvasRGBA(canvas, 0, 0, width, height, 30);
}
// window.setInterval(function () {
//     for (var x = 0; x < canvas.width; x++) {
//         for (var y = 0; y < canvas.height; y++) {
//             var r = simplex.noise3D(x / 16, y / 16, t / 16) * 0.5 + 0.5;
//             //var g = simplex.noise3D(x / 8, y / 8, t / 16) * 0.5 + 0.5;
//             data[(x + y * 256) * 4 + 0] = r * 255;
//             //data[(x + y * 256) * 4 + 1] = (r + g) * 200;
//             data[(x + y * 256) * 4 + 2] = 0;
//             data[(x + y * 256) * 4 + 3] = 255;
//         }
//     }
//     t++;
//     ctx.putImageData(imgdata, 0, 0);
// }, 1000 / 10);

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}