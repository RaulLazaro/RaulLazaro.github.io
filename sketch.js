var simplex = new SimplexNoise();
var t = 0;

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);
    document.getElementById('defaultCanvas0').style.width = "100%";
    document.getElementById('defaultCanvas0').style.height = "100%";
}

function draw() {
    console.time('loop');
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var index = (x + y * width) * 4;
            var n = simplex.noise3D(3 * x / 500, 3 * y / 500, t) * 0.5 + 0.5;
            n = Math.round(n * 10) / 10;

            pixels[index + 0] = 25 * n;       //r
            pixels[index + 1] = 20 * n;       //g
            pixels[index + 2] = 220 * n;       //b
            pixels[index + 3] = 255;
        }
    }
    updatePixels();
    t += 0.001;
    
    //var canvas = document.getElementById('defaultCanvas0');
    //var imgd = ImageTracer.getImgdata(canvas);
    //var tracedata = ImageTracer.imagedataToSVG( imgd );
		// Appending SVG
        //ImageTracer.appendSVGString( tracedata, 'svg' );
		//console.log( tracedata );
        console.timeEnd('loop');
        
}

function windowResized() {
    //resizeCanvas(windowWidth/2, windowHeight/2);
    document.getElementById('defaultCanvas0').style.width = "100%";
    document.getElementById('defaultCanvas0').style.height = "100%";
}
