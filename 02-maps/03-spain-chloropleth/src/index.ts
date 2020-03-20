import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./data/regions.json");
const municipalitiesjson = require("./data/municipalities.json");
import { Topology, GeometryCollection, Objects } from "topojson-specification";
const d3Composite = require("d3-composite-projections");
import { presimplify, simplify, feature } from "topojson";
import { Feature, Geometry } from "geojson";

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

// Let's add some typings based on TopoJson data structure
interface Municipality {
  name: string;
  rate: number;
}

interface MunicipalityData extends Objects {
  municipios: GeometryCollection<Municipality>;
}

// Lets implement a scale to assign color to
// each municipality based on its population density.
// This time, instead of manually setting the domain,
// let's compute it dynamically from the data.
const densities = municipalitiesjson.objects.municipios.geometries.map(
  g => g.properties.rate
);
const densityExtent = d3.extent(densities);
const densityScale = d3
  //.scaleLinear()
  //.scaleLog()
  //.scalePow()
  .scaleSqrt() // more info about scales: https://observablehq.com/@d3/continuous-scales
  .exponent(1 / 6)
  .domain(<any>densityExtent)
  .range([0, 1]);
const colorScale = (density: number) =>
  // Given a number t in the range [0,1], returns the corresponding color from the “Blues” sequential color scheme represented as an RGB string.
  d3.interpolateBlues(densityScale(density || 0)); // e.g. Try interpolateReds, interpolateCool

// Let's paint first the map
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

// https://www.freecodecamp.org/forum/t/d3-topojson-feature-explanation/235396/2
// A topojson file contains  a mathematical descripcion of the map and
// features that links the shapes to a given concept (e.g. countries, regions,
// municipalities, provinces)
const municipalities = feature(
  municipalitiesjson,
  municipalitiesjson.objects.municipios
);

const municipalitiesGroup = svg.append("g");

municipalitiesGroup
  .selectAll("path")
  // In data we get array of features (municipality name and rate value)
  // we pass that array, and in the second parameter we are indicating the key
  // in this case the name field that contains the municipality name
  .data(
    municipalities["features"],
    (d: Feature<Geometry, Municipality>) => d.properties.name
  )
  .enter()
  .append("path")
  .attr("d", geoPath)
  // From the feature object we extract the rate and usig it to fill the current
  // municipality background
  .attr("fill", (d: Feature<Geometry, Municipality>) =>
    colorScale(d.properties.rate)
  );
