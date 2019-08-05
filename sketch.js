var simplex = new SimplexNoise();
var t = 0;
var col=[[0, 255, 255], [0, 204, 255], [0, 153, 255], [0, 102, 255], [0, 51, 255], [0, 0, 255], [0, 0, 229], [0, 0, 178], [0, 0, 127], [0, 0, 76]];
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
            n = Math.round(n * 9);
            pixels[index + 0] = col[n][0];       //r
            pixels[index + 1] = col[n][1];       //g
            pixels[index + 2] = col[n][2];       //b
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
