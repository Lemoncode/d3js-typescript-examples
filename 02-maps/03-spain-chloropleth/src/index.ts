import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./data/regions.json");
const municipalitiesjson = require("./data/municipalities.json");
import { Topology, GeometryCollection, Objects } from "topojson-specification";
const d3Composite = require("d3-composite-projections");
import { presimplify, simplify, feature } from "topojson";
import { Feature, Geometry } from "geojson";

console.log(spainjson);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800);

const aProjection = d3Composite
  .geoConicConformalSpain()
  // Let's make the map bigger to fit in our resolution
  .scale(3300)
  // Let's center the map
  .translate([500, 400]);

const geoPath = d3.geoPath().projection(aProjection);
const geojson = topojson.feature(spainjson, spainjson.objects.ccaa);

// (*) Prior to define the onDataReady function callback
// we will need typings here to specify the structure of the
// expected regions and municipalities entities.
interface Municipality {
  name: string;
  rate: number;
}

interface MunicipalityData extends Objects {
  municipios: GeometryCollection<Municipality>;
}

// (*) Lets implement a scale to assign color to
// each municipality based on its population density.
// This time, instead of manually setting the domain,
// let's compute it dynamically from the data.
const densities = municipalitiesjson.objects.municipios.geometries.map(
  g => g.properties.rate
);
const densityExtent = d3.extent(densities);
const densityScale = d3
  .scaleSqrt()
  .exponent(1 / 6)
  .domain(<any>densityExtent)
  .range([0, 1]);
const colorScale = (density: number) =>
  d3.interpolateReds(densityScale(density || 0));

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "region")
  // data loaded from json file
  .attr("d", geoPath as any);

// (*) Lets implement the ENTER pattern for each new municipality
// to be represented with a SVG path joined to its datum.
// First, we need to extract the corresponding feature collection.
const municipalities = feature(
  municipalitiesjson,
  municipalitiesjson.objects.municipios
);

const municipalitiesGroup = svg.append("g");

municipalitiesGroup
  .selectAll("path")
  .data(
    <any>municipalities["features"],
    (d: Feature<Geometry, Municipality>) => d.properties.name
  )
  .enter()
  .append("path")
  .attr("d", geoPath)
  .attr("fill", d => colorScale(<any>d["properties"]["rate"]));
