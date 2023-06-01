/*
*    main.js
*/

var svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

// Create a list called data with the values 25, 20, 15, 10, 5.
var data = [25, 20, 15, 10, 5];

// Bind the data to a series of rectangles of width 40 where the bound data represents its height.
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i)=> {return i * 60;})
  .attr("y", (d,i)=>{ return i * 5;})
  .attr("width", 40)
  .attr("height", (d)=>{return d;})
  .attr("fill", "magenta");

