import * as d3 from "d3";
import { resultCollectionSpainNov19 } from "./data";

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

svg
  .selectAll("rect")
  .data(resultCollectionSpainNov19)
  .enter()
  .append("rect")
  .attr("width", 50)
  .attr("height", d => d.seats)
  .attr("x", (d, i) => i * 60)
  .attr("y", d => 200 - d.seats);
