let zoom = 50;

let canvasScale = 800;

let yy = [];
let index = 0;

function setup() {
	createCanvas(canvasScale, canvasScale);
	frameRate(1/2);
}

function draw() {
	background(0);

	translate(width/2, height/2);

	for(x = -(width/2)/zoom; x <= (width/2)/zoom; x+=1/zoom){
		stroke(100, 100, 100);
		f(0, x);
		f(x, 0);

		//stroke(0, 255, 0);
		//f(sin(x), x, -2*PI, 4*PI);

		//stroke(0, 0, 255);
		//f(x*x, x);

		//stroke(200, 50, 200);
		//f(x*x*x, x);

		//stroke(255, 0, 0);
		//f(-sqrt( 2 - ( (x-2)*(x-2) ) ) + 2, x);
		//f( sqrt( 2 - ( (x-2)*(x-2) ) ) + 2, x);.

		for(let y of yy){
			if(y != null){
				stroke(0, 0, 255);
				f(eval(y), x);
			}
		}
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

function addF() {
	document.getElementById("functionDiv").innerHTML = '<div style="margin-top:10px; margin-bottom:10px;"><label>f(x)=</label><input type="input" id="function' + index + '" name="function' + index + '" value="x"><button onclick="submit(' + index + ')">Submit</button></div>' + document.getElementById("functionDiv").innerHTML;
	index++;
}

function submit(i) {
	yy.push(document.getElementById("function"+i).value);
}
