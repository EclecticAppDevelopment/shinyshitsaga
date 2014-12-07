var cnvW = 350;
var cnvH = 350;
var symbols = 7;
var switches = 0;
var score = 0;

var clickCol = -5;
var clickRow = -5;
var selected = 0;

// The visible rows & columns
var rows = 5;
var cols = 5;

// The tiles generated off screen for scrolling
var overTop = 0;
var overBtm = 0;
var tRows = (rows + overTop + overBtm);
var overLft = 0;
var overRgt = 0;
var tCols = (cols + overLft + overRgt);

var tTiles = tRows * tCols;

var grid = [[" ", " "], [" ", " "], [" ", " "], [" ", " "], [" ", " "] , [" ", " "], [" ", " "], [" ", " "], [" ", " "] , [" ", " "], [" ", " "], [" ", " "], [" ", " "] ];

var path = [[" "," "]];

var crossCol = "#FF6600";
var heartCol = "#FF0000";
var diamondCol = "#A0A0BA";
var starCol = "#00FFFF";
var triangleCol = "#00AA00";
var clubsCol = "#000000";
var circleCol = "#6600CC";

function init(){

	console.log("Welcome to Shiny Shit Saga v1!");
	//Initialise canvas properties
	c = document.getElementById("canvas");
	//h = document.getElementById("help");
	//h.width = cnvW;
	c.height = cnvH;
	c.width = cnvW;
	
	//c.addEventListener("touchstart", doTouch, false);
	c.addEventListener("mousedown", doClick, false);
	//c.addEventListener("mouseover", hoverIn);
	//c.addEventListener("mouseout", hoverOut);
	//	c.addEventListener("contextmenu", function(){alert("right-click")}, false);
	//	document.getElementById('canvas').oncontextmenu = function() {
	//		alert('right click!')
	//	}

 
	// When canvas found, set context to 2d and begin
	if (c.getContext){
        ctx = c.getContext("2d");   
		canv = $( "#canvas" );
		offset = canv.offset();
		createGrid();
		drawGrid();
    }
}

function doClick(event){
    
    event.preventDefault();  
    touchx = Math.floor(event.targetTouches[0].pageX - offset.left);
    touchy = Math.floor(event.targetTouches[0].pageY - offset.top);
   	checkTap();
 
}

function doClick(event){
    
    event.preventDefault();  
    touchx = Math.floor(event.pageX - offset.left);
    touchy = Math.floor(event.pageY - offset.top);
	checkTap();

}

function checkTap(){
	
	oldCol = clickCol;
	oldRow = clickRow;
	clickCol = Math.floor(touchx/cW)+overLft;
	clickRow = Math.floor(touchy/rH)+overTop;
	
	if ((clickCol == oldCol) && (clickRow == oldRow)){
	
		if (grid[clickCol][clickRow] == 0){
			// Nowt
		}else{
		
			checkMatch();
			
			if (matched > 0){
			
				grid[clickCol][clickRow] = 0;
				score = score + (matched*matched);
    		matched = 0;
				var flattened = grid.reduce(function(a, b) {
					return a.concat(b);});
				var total = flattened.reduce(function(a, b) {
					return a + b;});
				document.getElementById("info").innerHTML = "Shiny Shit Saga - Switches = "+switches+" - Score = "+score+" Count = "+total;
		
				if (total == 0){
					console.log("WIN! Final Score = "+score);
				document.getElementById("info").innerHTML = "Shiny Shit WIN! Final Score = "+score+" Total Switches = "+switches;

				}else{
					console.log("KEEP GOING! Score = "+score);
				}
				
			}
			
		}
		
		console.log("Deselected");
		selected = 0;
		oldRow = -5;
		oldCol = -5;
		clickCol = -5;
		clickRow = -5;
		
	}else{
	
		console.log("Clicked column "+clickCol+" Clicked row "+clickRow);
		selected++;
		
	}
	
	if (selected == 2){
	
		if (
		(
			(Math.abs(oldCol - clickCol) == 1)
			&& 
			(Math.abs(oldRow - clickRow) == 0)
		) 
		||
		(
			(Math.abs(oldCol - clickCol) == 0)
			&& 
			(Math.abs(oldRow - clickRow) == 1)
		) )
		{
			switchval = grid[oldCol][oldRow];
			grid[oldCol][oldRow] = grid[clickCol][clickRow];
			grid[clickCol][clickRow] = switchval;
			console.log("---------");
			console.log("SWITCHED!");
			console.log("---------");
			switches++;
			document.getElementById("info").innerHTML = "Shiny Shit Saga - Switches = "+switches;
		}
		selected = 0;
		oldRow = -5;
		oldCol = -5;
		clickCol = -5;
		clickRow = -5;
	}
	
	drawGrid();
	
}

/*
function checkMatch(){

	cC = clickCol;
	cR = clickRow;
	matched = 1;
	cV = grid[cC][cR];
	do {checkPath(cC, cR, cV);}
	while (path.length > 1);

}

function checkPath(col, row, value){

	

}*/

function checkMatch(){

	cC = clickCol;
	cR = clickRow;
	matched = 1;

	for (a = 1; a < cols; a++){
		
		if (cC - a >= 0){
			if (grid[cC][cR] == grid[cC-a][cR]){
				matched++;
				grid[cC-a][cR] = 0;
				console.log("Left+1 Total:"+matched);
			}else{
				break;
			}
		}else{
			break;
		}
	
	}
	for (a = 1; a < cols; a++){
		
		if (cC + a >= 0){
			if (grid[cC][cR] == grid[cC+a][cR]){
				matched++;
				grid[cC+a][cR] = 0;
				console.log("Right+1 Total:"+matched);
			}else{
				break;
			}
		}else{
			break;
		}
	
	}
	for (a = 1; a < rows; a++){
		
		if (cR - a >= 0){
			if (grid[cC][cR] == grid[cC][cR-a]){
				matched++;
				grid[cC][cR-a] = 0;
				console.log("Top+1 Total:"+matched);
			}else{
				break;
			}
		}else{
			break;
		}
	
	}
	for (a = 1; a < rows; a++){
		
		if (cR + a >= 0){
			if (grid[cC][cR] == grid[cC][cR+a]){
				matched++;
				grid[cC][cR+a] = 0;
				console.log("Bottom+1 Total:"+matched);
			}else{
				break;
			}
		}else{
			break;
		}
	
	}
		
}

function createGrid(){

	var num = 0;

	for (a = 0; a < tRows; a++){
	
		for (b = 0; b < tCols; b++){
		
			console.log("Row "+a+ " Col "+b + " Num "+num);
			grid[a][b] = [""];
			//grid[a][b] = num;
			//grid[a][b] = String.fromCharCode(65+Math.floor(26*Math.random()));
			//grid[a][b] = randomAlpha();
			grid[a][b] = Math.floor(symbols*Math.random())+1;
			console.log("Grid val = "+grid[a][b]);
			num++;
		
		}
	
	}

}

function drawGrid(){

	// Calculate drawn grid variables
	rH = c.height / rows; 
	cW = c.width / cols;
	/*ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	console.log("LINES");
	for (a = 0; a < cols; a++){
		
		ctx.moveTo(a*cW, 0);
		ctx.lineTo(a*cW, c.height);
		ctx.stroke();
		
	}
	for (b = 0; b < cols; b++){
		
		ctx.moveTo(0,b*rH);
		ctx.lineTo(c.width, b*rH);
		ctx.stroke();
		//fStyle = "#"+Math.floor(999999*Math.random());
		//console.log(fStyle);
		//ctx.fillStyle = fStyle;
		//ctx.fill();
	
	}
	ctx.closePath();*/
	/*ctx.font = Math.floor(rH-30)+"px Verdana";
	ctx.fillStyle = "#FFFFFF";
	console.log("TEXT");*/
	for (a = 0; a < tRows; a++){
	
		for (b = 0; b < tCols; b++){
			
			//console.log("Row "+a+" Col "+b+" Val "+grid[a][b]);
			//ctx.fillText(grid[a][b], a*cW-(overLft*cW)+5, (b+1)*rH-(overTop*rH)-10);
			var midx = a*cW-(overLft*cW)+(cW/2)-2;
			var midy = b*rH-(overTop*rH)+(rH/2)-2;
			
			// Draw tiles
			if ((a == clickCol) && (b == clickRow)){
				console.log("clickTile = "+a+","+b);
				ctx.fillStyle = "#66FF33";
			}
			else{
				//console.log("normalTile = "+a+","+b);
				ctx.fillStyle = "#FFFFCC";
			}
			ctx.fillRect((midx-cW/2)-1,(midy-rH/2)-1,cW-2,rH-2);
			
			var padding = 5;
			var grd=ctx.createRadialGradient(midx,midy,5,midx,midy,cW/2);
			switch (grid[a][b]){
				case 0:
					ctx.fillStyle = "#FFFFCC";
					ctx.fillRect(midx-cW/2+1,midy-rH/2+1,cW-4,rH-4);
					break;
				case 1:
					grd.addColorStop(0,heartCol);
					grd.addColorStop(1,"#FF33CC");
					drawHeart(midx, midy, cW-padding, rH-padding, grd);
					break;
				case 2:
					grd.addColorStop(0,"white");
					grd.addColorStop(1,diamondCol);
					drawDiamond(midx, midy, cW-padding, rH-padding, grd);
					break;
				case 3:
					grd.addColorStop(0,crossCol);
					grd.addColorStop(1,"#663300");
					drawCross(midx,midy,cW-padding,rH-padding,rH/3,grd);
					break;
				case 4:
					grd.addColorStop(0,starCol);
					grd.addColorStop(1,"purple");
					drawStar(midx,midy,(cW/2)-padding,grd);
					break;	
				case 5:
					grd.addColorStop(0,triangleCol);
					grd.addColorStop(1,"#006600");
					drawTriangle(midx,midy,cW-padding,grd);
					break;	
				case 6:
					grd.addColorStop(0,clubsCol);
					grd.addColorStop(1,"#030303");
					drawClubs(midx,midy,(cW/2)-padding,grd);
					break;		
				default:
					grd.addColorStop(0,circleCol);
					grd.addColorStop(1,"#0000FF");
					drawCircle(midx, midy,(cW/2)-padding,grd);
					break;
			}
	
		}
		
	}
	
}

function drawClubs(x,y,r,col){

	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.moveTo(x+r, y+(r/4));
	ctx.arc(x+(r/2), y+(r/4), (r/2), 0, 2*Math.PI, false);
	ctx.fill();
	ctx.moveTo(x,y+(r/4));
	ctx.arc(x-(r/2),y+(r/4),(r/2),0,2*Math.PI, false);
	ctx.fill();
	ctx.moveTo(x+(r/2),y-(r/2));
	ctx.arc(x,y-(r/2),(r/2),0,2*Math.PI, false);
	ctx.fill();
	ctx.fillRect(x-(r/4),y,(r/2),r-1);
	ctx.closePath();


}

function drawCircle(x,y,r,col){
	
	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
	
}

function drawDiamond(x, y, w, h, col){
	
	w = w/2;
	h = h/2;
	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.moveTo(x+w, y);
	ctx.lineTo(x, y+h);
	ctx.lineTo(x-w, y);
	ctx.lineTo(x,y-h);
	ctx.lineTo(x+w,y);
	ctx.fill();
	ctx.closePath();

}

function drawCross(x,y,w,h,thick,col){

	var orig = ctx.lineWidth;
	ctx.lineWidth = thick;
	ctx.strokeStyle = col;
	ctx.beginPath();
	ctx.moveTo(x,y-(h/2));
	ctx.lineTo(x,y+(h/2));
	ctx.stroke();
	ctx.moveTo(x-(w/2),y);
	ctx.lineTo(x+(w/2),y);
	ctx.stroke();
	ctx.closePath();
	ctx.lineWidth = orig;
	
}

function drawTriangle(x,y,r,col){

	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.moveTo(x-(r/2),y-(r/2));
	ctx.lineTo(x+(r/2),y-(r/2));
	ctx.lineTo(x,y+(r/2));
	ctx.lineTo(x-(r/2),y-(r/2));
	ctx.fill();
	ctx.closePath();

}

function drawStar(x,y,r,col){

	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.moveTo(x-r,y-(r/2));
	ctx.lineTo(x+r,y-(r/2));
	ctx.lineTo(x-r,y+r);
	ctx.lineTo(x,y-r);
	ctx.lineTo(x+r,y+r);
	ctx.lineTo(x-r,y-(r/2));
	ctx.fill();
	ctx.closePath();

}

function drawHeart(x, y, w, h, col){

	w = w/2;
	h = h/2;
	ctx.fillStyle = col;
	ctx.strokeStyle = col;
	ctx.beginPath();
	ctx.moveTo(x,y-(h/2));
	ctx.lineTo(x,y+h);
	ctx.lineTo(x+w,y-h/2);
	ctx.lineTo(x-w,y-h/2);
	ctx.lineTo(x,y+h);
	//ctx.fill();
	ctx.moveTo(x+w, y -(h/2));
	ctx.arc(x+(w/2), y - (h/2), (w/2), 0, Math.PI, true);
	//ctx.fill();
	//ctx.moveTo(x,y-(h/2));
	ctx.arc(x-(w/2),y-(h/2),(w/2),0,Math.PI, true);
	ctx.fill();
	ctx.closePath();
	
}

function randomAlpha(){

	return r = String.fromCharCode(65+Math.floor(26*Math.random()));

}
