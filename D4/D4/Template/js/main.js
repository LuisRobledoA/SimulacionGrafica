/*
*    main.js
*/

var dataset = [
    { building: "Building A", height: 200 },
    { building: "Building B", height: 300 },
    { building: "Building C", height: 500 },
    { building: "Building D", height: 400 },
    { building: "Building E", height: 600 },
    { building: "Building F", height: 100 },
    { building: "Building G", height: 1200 }
  ];
  
  var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);
  
  var x = d3.scaleBand()
    .domain(dataset.map((d) => d.building))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);
  
  var y = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.height)])
    .range([0, 400]);
  
  var color = d3.scaleOrdinal(d3.schemeSet3)
    .domain(dataset.map((d) => d.building));
  
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.building))
    .attr("y", (d) => 400 - y(d.height))
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(d.height))
    .attr("fill", (d) => color(d.building));