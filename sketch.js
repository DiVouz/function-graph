let zoom = 50;

let canvasScale = 800;

let yy = [];
let rr = [];
let gg = [];
let bb = [];
let index = 0;

function setup() {
	createCanvas(canvasScale, canvasScale);
	frameRate(1/2);

	addF();
	addF();
	addF();
	submit(2);
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

		zoom = document.getElementById("zoomSlider").value;

		for(let j = 0; j < yy.length; j++){
			if(yy[j] != null){
				stroke(rr[j], gg[j], bb[j]);
				f(eval(yy[j]), x);
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
	document.getElementById("functionDiv").innerHTML = '<div style="margin-top:10px; margin-bottom:10px;"><label>f(x)=</label><input type="input" id="function' + index + '" name="function' + index + '" value="2*x-1"><button id="submit' + index + '" onclick="submit(' + index + ')">Submit</button><input type="text" id="red' + index + '" value="255" style="color:white; background-color:red;" minlength="1" maxlength="3" size="1"></input><input type="text" id="green' + index + '" value="255" style="color:white; background-color:green;" minlength="1" maxlength="3" size="1"></input><input type="text" id="blue' + index + '" value="255" style="color:white; background-color:blue;" minlength="1" maxlength="3" size="1"></input></div>' + document.getElementById("functionDiv").innerHTML;
	index++;
}

function submit(i) {
	if(document.getElementById("submit"+i).innerHTML == "Remove"){
		yy.splice(yy.indexOf(document.getElementById("function"+i).value), 1);

		rr.splice(yy.indexOf(document.getElementById("function"+i).value), 1);
		gg.splice(yy.indexOf(document.getElementById("function"+i).value), 1);
		bb.splice(yy.indexOf(document.getElementById("function"+i).value), 1);

		document.getElementById("submit"+i).innerHTML = "Submit";
		document.getElementById("function"+i).disabled = false;

		document.getElementById("red"+i).disabled = false;
		document.getElementById("green"+i).disabled = false;
		document.getElementById("blue"+i).disabled = false;
	}else{
		yy.push(document.getElementById("function"+i).value);

		rr.push(document.getElementById("red"+i).value);
		gg.push(document.getElementById("green"+i).value);
		bb.push(document.getElementById("blue"+i).value);

		document.getElementById("submit"+i).innerHTML = "Remove";
		document.getElementById("function"+i).disabled = true;

		document.getElementById("red"+i).disabled = true;
		document.getElementById("green"+i).disabled = true;
		document.getElementById("blue"+i).disabled = true;
	}
}
