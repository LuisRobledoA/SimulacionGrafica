const margin = { top: 10, right: 10, bottom: 100, left: 100 };
const width = 600;
const height = 400;
let flag = true;

const x = d3.scaleBand().range([0, width]).paddingInner(0.2).paddingOuter(0.3);
const y = d3.scaleLinear().range([height, 0]);

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

const g = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = g
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`);

const yAxisGroup = g.append("g").attr("class", "y-axis");

const yLabel = g
  .append("text")
  .attr("class", "y-axis-label")
  .attr("x", -height / 2)
  .attr("y", -60)
  .attr("font-size", "30px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)");

const update = (data) => {
  const value = flag ? "revenue" : "profit";

  x.domain(data.map((d) => d.month));
  y.domain([0, d3.max(data, (d) => d[value])]);

  const xAxis = d3.axisBottom(x);

  xAxisGroup
    .transition()
    .duration(500)
    .call(xAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("filled", "white")
    .attr("text-anchor", "middle");

  const yAxis = d3.axisLeft(y).ticks(10).tickFormat((d) => `$${d / 1000}K`);

  yAxisGroup.transition().duration(500).call(yAxis);

  const label = flag ? "Revenue" : "Profit";
  yLabel.text(label);

  const rects = g.selectAll("rect").data(data);

  rects
    .exit()
    .transition()
    .duration(500)
    .attr("height", 0)
    .remove();

  rects
    .transition()
    .duration(500)
    .attr("x", (d) => x(d.month))
    .attr("y", (d) => y(d[value]))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d[value]));

  rects
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.month))
    .attr("y", (d) => y(d[value]))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d[value]))
    .attr("fill", "rgb(0, 255, 204)");
};

d3.json("data/revenues.json")
  .then((data) => {
    data.forEach((d) => {
      d.revenue = +d.revenue;
      d.profit = +d.profit;
    });

   d3.interval(( ) => {
	var newData = flag ? data : data.slice(1);
	update(newData);
	flag = !flag;
}, 1000);

    update(data);
  })
  .catch((error) => {
    console.log(error);
  });
