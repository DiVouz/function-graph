let zoom;

let canvasScale;

let xFrom = [];
let xTo = [];
let yy = [];
let rr = [];
let gg = [];
let bb = [];
let index;

function setup() {
	canvasScale = 800;
	index = 0;

	createCanvas(canvasScale, canvasScale);
	frameRate(1/2);

	translate(width/2, height/2);

	addF();
	addF();
	addF();

	updateZoom();

	submit(2);
}

function draw() {
	translate(width/2, height/2);
}

function updateOnChange() {
	background(255);

	for(x = (1/zoom)-(width/2)/zoom; x <= (width/2)/zoom; x+=1/(2*zoom)) {
		stroke(150, 150, 150);
		f(0, x);
		f(x, 0);

		for(let j = 0; j < yy.length; j++) {
			if(yy[j] != null){
				stroke(rr[j], gg[j], bb[j]);
				f(yy[j], x, xFrom[j], xTo[j]);
			}
		}
	}
	
}

function f(yString, x, fromString, toString) {
	let from = eval(fromString);
	let to = eval(toString);

	if(from > to) return null;

	if(from > (width/2)/zoom) return null;
	if(to < -(width/2)/zoom) return null;

	if(from == null || from < -(width/2)/zoom) from = -(width/2)/zoom;
	if(from == null || to > (width/2)/zoom) to = (width/2)/zoom;

	if(x < from || x > to) return null;

	let xThis = x;
	let yLast;

	y = eval(yString);

	x = x-(1/zoom);
	yLast = eval(yString);

	x = xThis;

	if(y*zoom > height/2 || y*zoom < -height/2) return null;

	return line((x-(1/zoom))*zoom, -yLast*zoom, x*zoom, -y*zoom);
	//return point(x*zoom, -y*zoom);
}

function addF() {
	document.getElementById("functionDiv").innerHTML = '<div style="margin-top:10px; margin-bottom:10px; font-size:17px;"><label>f(x)=</label><input type="input" id="function' + index + '" name="function' + index + '" value="2*x-1"><button id="submit' + index + '" onclick="submit(' + index + ')">Submit</button> x∈[<input type="text" id="xFrom' + index + '"" value="-Infinity" size="2"></input>,<input type="text" id="xTo' + index + '"" value="Infinity" size="2"></input>] Color<input type="text" id="red' + index + '" value="0" style="color:white; background-color:red;" minlength="1" maxlength="3" size="1"></input><input type="text" id="green' + index + '" value="0" style="color:white; background-color:green;" minlength="1" maxlength="3" size="1"></input><input type="text" id="blue' + index + '" value="0" style="color:white; background-color:blue;" minlength="1" maxlength="3" size="1"></input></div>' + document.getElementById("functionDiv").innerHTML;
	index++;
}

function submit(i) {
	if(document.getElementById("submit"+i).innerHTML == "Remove"){
		yy.splice(yy.indexOf(document.getElementById("function"+i).value), 1);

		xFrom.splice(yy.indexOf(document.getElementById("function"+i).value), 1);
		xTo.splice(yy.indexOf(document.getElementById("function"+i).value), 1);

		rr.splice(yy.indexOf(document.getElementById("function"+i).value), 1);
		gg.splice(yy.indexOf(document.getElementById("function"+i).value), 1);
		bb.splice(yy.indexOf(document.getElementById("function"+i).value), 1);

		document.getElementById("submit"+i).innerHTML = "Submit";
		document.getElementById("function"+i).disabled = false;

		document.getElementById("xFrom"+i).disabled = false;
		document.getElementById("xTo"+i).disabled = false;

		document.getElementById("red"+i).disabled = false;
		document.getElementById("green"+i).disabled = false;
		document.getElementById("blue"+i).disabled = false;
	}else{
		yy.push(document.getElementById("function"+i).value);

		xFrom.push(document.getElementById("xFrom"+i).value);
		xTo.push(document.getElementById("xTo"+i).value);

		rr.push(document.getElementById("red"+i).value);
		gg.push(document.getElementById("green"+i).value);
		bb.push(document.getElementById("blue"+i).value);

		document.getElementById("submit"+i).innerHTML = "Remove";
		document.getElementById("function"+i).disabled = true;

		document.getElementById("xFrom"+i).disabled = true;
		document.getElementById("xTo"+i).disabled = true;

		document.getElementById("red"+i).disabled = true;
		document.getElementById("green"+i).disabled = true;
		document.getElementById("blue"+i).disabled = true;
	}
	updateOnChange();
}

function updateZoom() {
	zoom = document.getElementById("zoomSlider").value;
	updateOnChange();
}
