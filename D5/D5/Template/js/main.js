/*
*    main.js
*/

var margin = {left: 100, right: 10, top: 10, bottom: 120};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/buildings.json").then(function(data) {
  var x = d3.scaleBand()
    .domain(data.map(function(d) { return d.name; }))
    .range([0, width])
    .padding(0.2);

  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", "7")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.height; })])
    .range([height, 0]);

  var yAxisCall = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(function(d) { return d + "m"; });

  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

  g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width/2)
    .attr("y", height + 140)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("The world's tallest buildings");

  g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height/2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)");


  var rects = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", function(d) { return y(d.height); })
    .attr("x", function(d) { return x(d.name); })
    .attr("width", x.bandwidth)
    .attr("height", function(d) { return height - y(d.height); })
    .attr("fill", "rgb(255, 153, 0)");
});
