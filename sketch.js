var xFrom = [];
var xTo = [];
var yy = [];
var rr = [];
var gg = [];
var bb = [];
var stress = [];
var index;

var findex;

var aOut, aMin, aMax, aValue, aStep;

var zoom, zoomMin, zoomMax, zoomValue, zoomStep;

function setup() {

	index = 0;
	findex = 0;

	if(window.innerWidth < window.innerHeight){
		createCanvas(window.innerWidth-15, window.innerWidth-15);
	}else if(window.innerWidth >= window.innerHeight){
		createCanvas(window.innerHeight-15, window.innerHeight-15);
	}
	
	frameRate(1);
	translate(width/2, height/2);

	zoomMin = 0;
	zoomMax = width;
	zoomValue = 40;
	zoomStep = 1;

	aMax = 20;
	aMin = -aMax;
	aValue = 0;
	aStep = 1;

	createZoomSlider();
	updateZoom();

	addInputF();
	updateA();

	//submit(0);
}

function draw() {

	translate(width/2, height/2);
}

function updateOnChange() {
	//background(240);
	background(255);

	stroke(255, 0, 0);

	createAxis();

	for(let x = (1/zoom)-(width/2)/zoom; x <= (width/2)/zoom; x+=1/zoom) {
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

	addF();
}

function drawWords(x, y, index) {
	fill(0);
  	text(index, x, y);
}

function createAxis() {
	stroke(150, 150, 150);

	let lineLength = 10;
	
	let xLast = 0;
	let yLast = 0;

	let txtSize = width/100;
	textSize(txtSize);

  	textAlign(CENTER, CENTER);

  	for(let x = (1/zoom)-(width/2)/zoom; x <= (width/2)/zoom; x+=1/zoom) {
		f(0, x);
		f(x, 0);
	}

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

	let a = 1*aOut;

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

	let a = 1*aOut;

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

function addInputF() {
	document.getElementById("inputFunctionDiv").innerHTML = '<div style="margin-top:10px; margin-bottom:10px; font-size:17px;"><label>f(x)=</label><input type="input" id="function" value="2*x-1"><button id="add" onclick="submit()">Submit</button> x∈[<input type="text" id="xFrom" value="-Infinity" size="2"></input>,<input type="text" id="xTo" value="Infinity" size="2"></input>] Color<input type="text" id="red" value="0" style="color:white; background-color:red;" minlength="1" maxlength="3" size="1"></input><input type="text" id="green" value="0" style="color:white; background-color:green;" minlength="1" maxlength="3" size="1"></input><input type="text" id="blue" value="0" style="color:white; background-color:blue;" minlength="1" maxlength="3" size="1"></input> f΄(x)<input type="checkbox" id="stress"></input></div>' + document.getElementById("functionDiv").innerHTML;
}

function addF() {
	document.getElementById("functionDiv").innerHTML = "";
	for(let i = 0; i < yy.length; i++) {
		if(yy[i] != null){
			
			let fstress = "";
			if(stress[i]) fstress = "f΄(x)";

			document.getElementById("functionDiv").innerHTML = '<div id="functionDiv' + i + '" style="margin-top:10px; margin-bottom:10px; font-size:17px;"><label>f(x)=' + yy[i] + '</label>, <label>x∈[' + xFrom[i] + ',' + xTo[i] + ']</label>, <label>Color[<label style="color:red;">Red:' + rr[i] + '</label>, <label style="color:green;">Green:' + gg[i] + '</label>, <label style="color:blue;">Blue:' + bb[i] + '</label>]</label> ' + fstress + ' <i class="fa fa-close" onclick="removef(' + i + ')" style="color:red"></i></div>' + document.getElementById("functionDiv").innerHTML;
		}
	}
}

function submit() {
	yy.push(document.getElementById("function").value);
	document.getElementById("function").value = "x";

	if(document.getElementById("xFrom").value.length == 0){
		xFrom.push(-Infinity);
	}else{
		xFrom.push(document.getElementById("xFrom").value);
	}
	document.getElementById("xFrom").value = "-Infinity";
	
	if(document.getElementById("xTo").value.length == 0){
		xFrom.push(Infinity);
	}else{
		xTo.push(document.getElementById("xTo").value);
	}
	document.getElementById("xTo").value = "Infinity";
	
	if(document.getElementById("red").value < 0) {
		rr.push(0);
	}else if(document.getElementById("red").value > 255) {
		rr.push(255);
	}else{
		rr.push(document.getElementById("red").value);
	}
	document.getElementById("red").value = 0;

	if(document.getElementById("green").value < 0) {
		gg.push(0);
	}else if(document.getElementById("green").value > 255) {
		gg.push(255);
	}else{
		gg.push(document.getElementById("green").value);
	}
	document.getElementById("green").value = 0;

	if(document.getElementById("blue").value < 0) {
		bb.push(0);
	}else if(document.getElementById("blue").value > 255) {
		bb.push(255);
	}else{
		bb.push(document.getElementById("blue").value);
	}
	document.getElementById("blue").value = 0;

	stress.push(document.getElementById("stress").checked);
	document.getElementById("stress").checked = false;

	updateOnChange();
	findex++;
}

function removef(fin) {
	yy.splice(fin, 1);

	xFrom.splice(fin, 1);
	xTo.splice(fin, 1);
	rr.splice(fin, 1);
	gg.splice(fin, 1);
	bb.splice(fin, 1);
	stress.splice(fin, 1);

	updateOnChange();
}

//+ create aSlider
function createZoomSlider() {
	document.getElementById("slideContainer").innerHTML = '<input type="range" min="' + zoomMin + '" max="' + zoomMax + '" step="' + zoomStep + '" value="' + zoomValue + '" id="zoomSlider" onchange="updateZoom()" style="width:50%;"><label style="font-size:30px;">Zoom</label><div> <label>a</label><input type="range" min="' + aMin + '" max="' + aMax + '" step="' + aStep + '" value="' + aValue + '" id="aSlider" onchange="updateA()" style="width:25%"><label id="aValueID">' + aValue +'</label></div>';
}

function updateZoom() {
	zoom = document.getElementById("zoomSlider").value;
	if(zoom <= 0.5) zoom = 0.5;
	updateOnChange();
}

function updateA() {
	aOut = document.getElementById("aSlider").value;
	updateOnChange();
	document.getElementById("aValueID").innerHTML = aOut;
}
