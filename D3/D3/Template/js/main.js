
d3.csv("data/ages.csv").then((data) => {
    console.log(data);
  });
  
  d3.tsv("data/ages.tsv").then((data) => {
    console.log(data);
  });
  
  d3.json("data/ages.json").then((data) => {
    console.log(data);
  });
  
  d3.json("data/ages.json").then((data) => {
    data.forEach((d) => {
      d.age = +d.age; 
    });
    console.log(data);
  
  
    var svg = d3.select("#chart-area")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400);
  
    var circles = svg.selectAll("circle")
      .data(data);
  
    circles.enter()
      .append("circle")
      .attr("cx", function(d, i) {
        return (i * 40) + 10; 
      })
      .attr("cy", 50)
      .attr("r", function(d) {
        return d.age; 
      })
      .attr("fill", "maroon");
  
    circles.exit().remove();
  }).catch((error) => {
    console.log("Error loading file:", error);
  });
  
  
  d3.json("data/non-existing.json").then((data) => {
    data.forEach((d) => {
      d.age = +d.age; 
    });
  
    var svg = d3.select("#chart-area")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400);
  
    var circles = svg.selectAll("circle")
      .data(data);
  
    circles.enter()
      .append("circle")
      .attr("cx", function(d, i) {
        return (i * 50) + 50; 
      })
      .attr("cy", 200)
      .attr("r", function(d) {
        return d.age; 
      })
      .attr("fill", "green");
  
    circles.exit().remove();
  }).catch((error) => {
    console.log("Error loading file:", error);
  });