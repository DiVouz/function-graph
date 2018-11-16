let axesStroke = 3;
let linesStroke = 1;
let zoom = 100;

function setup() {
	createCanvas(800, 800);
	stroke(255);
}

function draw() {
	background(0);

	translate(width/2, height/2);

	for(x = -(width/2)/zoom; x <= (width/2)/zoom; x+=1/(zoom*zoom)){
		
		stroke(100, 100, 100);
		f(0, x);
		f(x, 0);

		stroke(0, 255, 0);
		f(sin(x), x, -2*PI, 4*PI);

		stroke(0, 0, 255);
		f(x*x, x);

		stroke(200, 50, 200);
		f(x*x*x, x);

		stroke(255, 0, 0);
		f(-sqrt( 2 - ( (x-2)*(x-2) ) ) + 2, x);
		f( sqrt( 2 - ( (x-2)*(x-2) ) ) + 2, x);
	}
}

function f(y, x, from, to) {
	if(from > to) return null;

	if(from > (width/2)/zoom) return null;
	if(to < -(width/2)/zoom) return null;

	if(from == null || from < -(width/2)/zoom) from = -(width/2)/zoom;
	if(from == null || to > (width/2)/zoom) to = (width/2)/zoom;

	if(x < from || x > to) return null;

	if(y*zoom > height/2 || y*zoom < -height/2) return null;
	return point(x*zoom, -y*zoom);
}
