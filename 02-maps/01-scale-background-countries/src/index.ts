import * as d3 from "d3";
import * as topojson from "topojson-client";
const europejson = require("./europe.json");
import { coronaVirusAffectedByCountry } from "./stats";

// set the affected color scale
var color = d3
  .scaleThreshold<number, string>()
  .domain([0, 1, 100, 500, 700, 1000])
  .range([
    "#FFFFF",
    "#FFE8E5",
    "#F88F70",
    "#CD6A4E",
    "#A4472D",
    "#7B240E",
    "#540000"
  ]);

const assignCountryBackgroundColor = (countryName: string) => {
  const item = coronaVirusAffectedByCountry.find(
    item => item.country === countryName
  );

  if (item) {
    console.log(item.affected);
  }

  return item ? color(item.affected) : color(0);
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color: #FBFAF0");

const aProjection = d3
  .geoMercator()
  // Let's make the map bigger to fit in our resolution
  .scale(500)
  // Let's center the map
  .translate([300, 900]);

const geoPath = d3.geoPath().projection(aProjection);
const geojson = topojson.feature(
  europejson,
  europejson.objects.continent_Europe_subunits
);

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .style("fill", function(d: any) {
    return assignCountryBackgroundColor(d.properties.geounit);
  })
  // data loaded from json file
  .attr("d", geoPath as any);
