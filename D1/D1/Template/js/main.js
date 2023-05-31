/*
*    main.js
*/


var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var circle = svg.append("circle")
	.attr("cx", 100)
	.attr("cy", 250)
	.attr("r", 70)
	.attr("fill", "yellow");

var circle = svg.append("circle")
.attr("cx", 200)
.attr("cy", 300)
.attr("r", 100)
.attr("fill", "red");

var rect = svg.append("rect")
.attr("x",5)
.attr("y", 5)
.attr("width", 200)
.attr("height", 60)
.attr("fill","orange");

var rect = svg.append("rect")
	.attr("x", 20)
	.attr("y", 20)
	.attr("width", 20)
	.attr("height", 20)
	.attr("fill","blue");
