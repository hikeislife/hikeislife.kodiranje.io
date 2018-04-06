var canvas = document.getElementById("sitelogo");
canvas.width = window.innerWidth;
canvas.height = 70;
var c = canvas.getContext("2d");
c.translate(0.5,-0.5);
var xCoord = 5,
	yCoord = 5,
	dotIncrement = 10;

window.addEventListener('resize', function() {
        canvas.height = 70;
        canvas.width = window.innerWidth;
        drawLogo();
});

function drawLogo() {

	//c.translate(-0.5,-0.5);
	// pozadina
	c.fillStyle="#999";
	for (var i=0; i < canvas.width/dotIncrement + 1; i++) {
		for (var j = 0; j < canvas.height/dotIncrement + 1; j++) {
			c.fillRect(xCoord,yCoord,1,1);
			yCoord += dotIncrement;
		}
		yCoord = 5;
		xCoord += dotIncrement;
	}

	// text
	c.fillStyle="#000";
	c.font = "40px Cutive Mono";
	c.fillText("kodiranje",50,45);

	//zaobljeni kvadratić
	c.strokeStyle="#000";
	c.beginPath();
	c.moveTo(47,24);
	c.lineTo(47,45);//left
	c.arcTo(47,50,53,50,5);//left to bottom
	c.lineTo(70,50);//bottom 
	c.arcTo(78,50,78,45,5);//bottom to right
	c.lineTo(78,24);//right
	c.arcTo(78,19,73,19,5);//right to top
	c.lineTo(53,19);//top
	c.arcTo(47,19,47,24,5);//top to left
	c.closePath();
	c.stroke();

	//selection
	c.beginPath();
	c.arc(38,13,5,0,2*Math.PI);
	function filler() {
		c.closePath();
		c.strokeStyle = "#ddd";
		c.stroke();
		c.fillStyle = "#ddd";
		c.fill();
		c.beginPath();
	}
	filler();
	c.arc(85,13,5,0,2*Math.PI);
	filler();
	c.arc(85,55,5,0,2*Math.PI);
	filler();
	c.arc(38,55,5,0,2*Math.PI);
	filler();
	c.beginPath();
	c.moveTo(45,13);
	c.lineTo(78,13);
	c.strokeStyle = "#ddd";
	c.stroke();
}

drawLogo();