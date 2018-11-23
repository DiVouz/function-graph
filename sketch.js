var xFrom = [];
var xTo = [];
var yy = [];
var rr = [];
var gg = [];
var bb = [];
var stress = [];
var index;

var zoom;
var zoomMin;
var zoomMax;
var zoomValue;
var zoomStep;

function setup() {

	index = 0;

	if(window.innerWidth < window.innerHeight){
		createCanvas(window.innerWidth-15, window.innerWidth-15);
	}else if(window.innerWidth >= window.innerHeight){
		createCanvas(window.innerHeight-15, window.innerHeight-15);
	}
	
	frameRate(1/2);
	translate(width/2, height/2);

	zoomMin = 0;
	zoomMax = width;
	zoomValue = 40;
	zoomStep = 1;

	createZoomSlider();
	updateZoom();

	addF();

	submit(0);
}

function draw() {
	translate(width/2, height/2);
}

function updateOnChange() {
	//background(240);
	background(255);

	stroke(255, 0, 0);

	for(let x = (1/zoom)-(width/2)/zoom; x <= (width/2)/zoom; x+=1/zoom) {
		createAxis(x);

		for(let j = 0; j < yy.length; j++) {
			if(yy[j] != null){
				stroke(rr[j], gg[j], bb[j]);
				f(yy[j], x, xFrom[j], xTo[j]);

				if(stress[j]) {
					stroke(255, 0, 0);
					fstress(yy[j], x, xFrom[j], xTo[j]);
				}
			}
		}
	}

	createLinesOfAxis();	
}

function drawWords(x, y, index) {
	fill(0);
  	text(index, x, y);
}

function createLinesOfAxis() {
	stroke(150, 150, 150);

	let lineLength = 10;
	
	let xLast = 0;
	let yLast = 0;

	let txtSize = width/100;
	textSize(txtSize);

  	textAlign(CENTER, CENTER);

	for(let x = 0.1; x <= (width/2)/zoom; x+=0.1) {
		x = round(x * 10) / 10;
		
		if((x % 1) == 0) {
			if(!((x*zoom - xLast*zoom) < 2)) {
				line(x*zoom, lineLength, x*zoom, -lineLength);
				line(-x*zoom, lineLength, -x*zoom, -lineLength);
				
				drawWords(x*zoom, lineLength+txtSize, x, txtSize);
				drawWords(-x*zoom, lineLength+txtSize, -x, txtSize);
			}else if((x % 5) == 0 && (x*zoom - xLast*zoom) >= 1.5) {
				line(x*zoom, lineLength, x*zoom, -lineLength);
				line(-x*zoom, lineLength, -x*zoom, -lineLength);
				
				drawWords(x*zoom, lineLength+txtSize, x, txtSize);
				drawWords(-x*zoom, lineLength+txtSize, -x, txtSize);
			}else if((x % 10) == 0 && (x*zoom - xLast*zoom) >= 1) {
				line(x*zoom, lineLength, x*zoom, -lineLength);
				line(-x*zoom, lineLength, -x*zoom, -lineLength);
				
				drawWords(x*zoom, lineLength+txtSize, x, txtSize);
				drawWords(-x*zoom, lineLength+txtSize, -x, txtSize);
			}else if((x % 20) == 0  && (x*zoom - xLast*zoom) >= 0.19) {
				line(x*zoom, lineLength, x*zoom, -lineLength);
				line(-x*zoom, lineLength, -x*zoom, -lineLength);
				
				drawWords(x*zoom, lineLength+txtSize, x, txtSize);
				drawWords(-x*zoom, lineLength+txtSize, -x, txtSize);
			}else if((x % 100) == 0) {
				line(x*zoom, lineLength, x*zoom, -lineLength);
				line(-x*zoom, lineLength, -x*zoom, -lineLength);
				
				drawWords(x*zoom, lineLength+txtSize, x, txtSize);
				drawWords(-x*zoom, lineLength+txtSize, -x, txtSize);
			}
		}else{
			if(!((x*zoom - xLast*zoom) <= 9.99)) {
				line(x*zoom, lineLength/2, x*zoom, -lineLength/2);
				line(-x*zoom, lineLength/2, -x*zoom, -lineLength/2);

				if(!((x*zoom - xLast*zoom) < 20)) {
					drawWords(x*zoom, lineLength/2+txtSize, x, txtSize);
					drawWords(-x*zoom, lineLength/2+txtSize, -x, txtSize);
				}	
			}
		}

		xLast = x;
	}

	textAlign(RIGHT, CENTER);

	for(let y = 0.1; y <= (width/2)/zoom; y+=0.1) {
		y = round(y * 10) / 10;
		
		if((y % 1) == 0) {
			if(!((y*zoom - yLast*zoom) < 2)) {
				line(lineLength, -y*zoom, -lineLength, -y*zoom);
				line(lineLength, y*zoom, -lineLength, y*zoom);
				
				drawWords(-lineLength-txtSize/2, y*zoom, -y, txtSize);
				drawWords(-lineLength-txtSize/2, -y*zoom, y, txtSize);
			}else if((y % 5) == 0 && (y*zoom - yLast*zoom) >= 1.5) {
				line(lineLength, -y*zoom, -lineLength, -y*zoom);
				line(lineLength, y*zoom, -lineLength, y*zoom);
				
				drawWords(-lineLength-txtSize/2, y*zoom, -y, txtSize);
				drawWords(-lineLength-txtSize/2, -y*zoom, y, txtSize);
			}else if((y % 10) == 0 && (y*zoom - yLast*zoom) >= 1) {
				line(lineLength, -y*zoom, -lineLength, -y*zoom);
				line(lineLength, y*zoom, -lineLength, y*zoom);
				
				drawWords(-lineLength-txtSize/2, y*zoom, -y, txtSize);
				drawWords(-lineLength-txtSize/2, -y*zoom, y, txtSize);
			}else if((y % 20) == 0  && (y*zoom - yLast*zoom) >= 0.19) {
				line(lineLength, -y*zoom, -lineLength, -y*zoom);
				line(lineLength, y*zoom, -lineLength, y*zoom);
				
				drawWords(-lineLength-txtSize/2, y*zoom, -y, txtSize);
				drawWords(-lineLength-txtSize/2, -y*zoom, y, txtSize);
			}else if((y % 100) == 0) {
				line(lineLength, -y*zoom, -lineLength, -y*zoom);
				line(lineLength, y*zoom, -lineLength, y*zoom);
				
				drawWords(-lineLength-txtSize/2, y*zoom, -y, txtSize);
				drawWords(-lineLength-txtSize/2, -y*zoom, y, txtSize);
			}
		}else{
			if(!((y*zoom - yLast*zoom) <= 9.99)) {
				line(lineLength/2, -y*zoom, -lineLength/2, -y*zoom);
				line(lineLength/2, y*zoom, -lineLength/2, y*zoom);

				if(!((y*zoom - yLast*zoom) < 20)) {
					drawWords(-lineLength/2-txtSize/2, y*zoom, -y, txtSize);
					drawWords(-lineLength/2-txtSize/2, -y*zoom, y, txtSize);
				}	
			}
		}

		yLast = y;
	}

}

function f(yString, x, fromString, toString) {
	let e = Math.E;

	let from = eval(fromString);
	let to = eval(toString);

	if(from > to) return null;

	if(from > (width/2)/zoom) return null;
	if(to < -(width/2)/zoom) return null;

	if(from == null || from < -(width/2)/zoom) from = -(width/2)/zoom;
	if(from == null || to > (width/2)/zoom) to = (width/2)/zoom;

	if(x < from || x > to) return null;

	let xThis = x;
	let y = eval(yString);

	x = x-(1/zoom);
	let yLast = eval(yString);

	x = xThis;

	if( ( (y*zoom) > (height/2) ) || ( (y*zoom) < -(height/2) ) ) return null;

	return line((x-(1/zoom))*zoom, -yLast*zoom, x*zoom, -y*zoom);
	//return point(x*zoom, -y*zoom);
}

function fstress(yString, x, fromString, toString) {
	let e = Math.E;

	let from = eval(fromString);
	let to = eval(toString);

	let step = 1/zoom;

	if(from > to) return null;

	if(from > (width/2)/zoom) return null;
	if(to < -(width/2)/zoom) return null;

	if(from == null || from < -(width/2)/zoom) from = -(width/2)/zoom;
	if(from == null || to > (width/2)/zoom) to = (width/2)/zoom;

	if(x < from || x > to) return null;

	let xRam = x;

	let y = eval(yString);

	x = x-step;
	let yLast = eval(yString);

	x = xRam;

	let xs = x;
	let ys = (y - yLast)/step;

	x = x-step;
	y = eval(yString);

	x = x-step;
	yLast = eval(yString);

	x = xRam;

	let xsLast = x-step;
	let ysLast = (y - yLast)/step;

	if(ys*zoom > height/2 || ys*zoom < -height/2) return null;

	return line(xsLast*zoom, -ysLast*zoom, xs*zoom, -ys*zoom);
}

function createAxis(x) {
	stroke(150, 150, 150);
	f(0, x);
	f(x, 0);
}

function addF() {
	document.getElementById("functionDiv").innerHTML = '<div style="margin-top:10px; margin-bottom:10px; font-size:17px;"><label>f(x)=</label><input type="input" id="function' + index + '" value="2*x-1"><button id="submit' + index + '" onclick="submit(' + index + ')">Submit</button> x∈[<input type="text" id="xFrom' + index + '"" value="-Infinity" size="2"></input>,<input type="text" id="xTo' + index + '"" value="Infinity" size="2"></input>] Color<input type="text" id="red' + index + '" value="0" style="color:white; background-color:red;" minlength="1" maxlength="3" size="1"></input><input type="text" id="green' + index + '" value="0" style="color:white; background-color:green;" minlength="1" maxlength="3" size="1"></input><input type="text" id="blue' + index + '" value="0" style="color:white; background-color:blue;" minlength="1" maxlength="3" size="1"></input> f΄(x)<input type="checkbox" id="stress' + index + '"></input></div>' + document.getElementById("functionDiv").innerHTML;
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

		stress.splice(yy.indexOf(document.getElementById("function"+i).value), 1);

		document.getElementById("submit"+i).innerHTML = "Submit";

		document.getElementById("function"+i).disabled = false;

		document.getElementById("xFrom"+i).disabled = false;
		document.getElementById("xTo"+i).disabled = false;

		document.getElementById("red"+i).disabled = false;
		document.getElementById("green"+i).disabled = false;
		document.getElementById("blue"+i).disabled = false;

		document.getElementById("stress"+i).disabled = false;
	}else{
		yy.push(document.getElementById("function"+i).value);

		if(document.getElementById("xFrom"+i).value.length == 0){
			xFrom.push(-Infinity);
		}else{
			xFrom.push(document.getElementById("xFrom"+i).value);
		}
		
		if(document.getElementById("xTo"+i).value.length == 0){
			xFrom.push(Infinity);
		}else{
			xTo.push(document.getElementById("xTo"+i).value);
		}
		
		if(document.getElementById("red"+i).value < 0) {
			rr.push(0);
		}else if(document.getElementById("red"+i).value > 255) {
			rr.push(255);
		}else{
			rr.push(document.getElementById("red"+i).value);
		}

		if(document.getElementById("green"+i).value < 0) {
			gg.push(0);
		}else if(document.getElementById("green"+i).value > 255) {
			gg.push(255);
		}else{
			gg.push(document.getElementById("green"+i).value);
		}

		if(document.getElementById("blue"+i).value < 0) {
			bb.push(0);
		}else if(document.getElementById("blue"+i).value > 255) {
			bb.push(255);
		}else{
			bb.push(document.getElementById("blue"+i).value);
		}

		stress.push(document.getElementById("stress"+i).checked);

		document.getElementById("submit"+i).innerHTML = "Remove";

		document.getElementById("function"+i).disabled = true;

		document.getElementById("xFrom"+i).disabled = true;
		document.getElementById("xTo"+i).disabled = true;

		document.getElementById("red"+i).disabled = true;
		document.getElementById("green"+i).disabled = true;
		document.getElementById("blue"+i).disabled = true;

		document.getElementById("stress"+i).disabled = true;
	}
	updateOnChange();
}

function createZoomSlider() {
	document.getElementById("slideContainer").innerHTML = '<input type="range" min="' + zoomMin + '" max="' + zoomMax + '" step="' + zoomStep + '" value="' + zoomValue + '" id="zoomSlider" onchange="updateZoom()" style="width:50%;"><label style="font-size:30px;">Zoom</label>';
}

function updateZoom() {
	zoom = document.getElementById("zoomSlider").value;
	if(zoom <= 0.5) zoom = 0.5;
	updateOnChange();
}
