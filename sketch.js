let axesStroke = 3;
let linesStroke = 1;
let zoom = 40;

function setup() {
	createCanvas(800, 800);
	stroke(255);
}

function draw() {
	background(0);

	translate(width/2, height/2);

	for(x = -(width/2)/zoom; x <= (width/2)/zoom; x+=1/(zoom*zoom/2)){
		
		stroke(100, 100, 100);
		f(0, x);
		f(x, 0);

		stroke(0, 200, 0);
		f(sin(x), x);

		stroke(0, 0, 200);
		f(x*x, x);
	}
}

function f(y, x) {
	if(y*zoom > height/2 || y*zoom < -height/2) return null;
	return point(x*zoom, -y*zoom);
}
	