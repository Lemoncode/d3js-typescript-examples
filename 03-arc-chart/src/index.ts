import * as d3 from "d3";
import { resultCollectionSpainNov19 } from "./data";

const svgDimensions = { width: 800, height: 500 };
const margin = { left: 5, right: 5, top: 10, bottom: 10 };
const chartDimensions = {
  width: svgDimensions.width - margin.left - margin.right,
  height: svgDimensions.height - margin.bottom - margin.top
};
const totalNumberSeats = resultCollectionSpainNov19.reduce(
  (sum, item) => sum + item.seats,
  0
);
const politicalPartiesCount = resultCollectionSpainNov19.length;
const barHeight = 200;

const politicalPartiesKeys: string[] = resultCollectionSpainNov19.map(
  item => item.party
);

const partiesColorScale = d3
  .scaleOrdinal(politicalPartiesKeys)
  .range([
    "#ED1D25",
    "#0056A8",
    "#5BC035",
    "#6B2E68",
    "#F3B219",
    "#FA5000",
    "#C50048",
    "#029626",
    "#A3C940",
    "#0DDEC5",
    "#FFF203",
    "#FFDB1B",
    "#E61C13",
    "#73B1E6",
    "#BECD48",
    "#017252"
  ]);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgDimensions.width)
  .attr("height", svgDimensions.height)
  .attr("style", "background-color: #FBFAF0");

const chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .attr("width", chartDimensions.width)
  .attr("height", chartDimensions.height);

const radius = Math.min(chartDimensions.width, chartDimensions.height) / 2;

chartGroup.attr("transform", `translate(${radius},${radius})`);

var arc = d3
  .arc()
  .innerRadius(79) // TODO Calculate this?
  .outerRadius(radius);

const pie = d3
  .pie()
  .startAngle(-90 * (Math.PI / 180))
  .endAngle(90 * (Math.PI / 180))
  .value(d => d.value);

const arcs = chartGroup
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g"); // Create a group to hoild each slice (we can have path and text if needed)

arcs
  .append("path")
  .attr("fill", (d, i) => partiesColorScale(d.party)) // TODO color ordinal
  .attr("transform", d => {
    // we have to make sure to set these before calling arc.centroid
    d.innerRadius = 0;
    d.outerRadius = radius;

    return `translate(${arc.centroid(d.seats)}`;
  });
