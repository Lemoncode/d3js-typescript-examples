# Spain Chrolopleth

TODO: Explain what is a chrolopleth

Explain we got a topojosn municipalities + population rate

# Steps

TODO: Where to get the data and copy

- We will take as starting example _00-boilerplate_, let's copy the content from that folder and execute _npm install_.

```bash
npm install
```

- When you deal with maps you can use two map formats GeoJSON or TopoJSON, topo JSON is lightweight and offers some extra
  features, let's install the needed package to work with:

```bash
npm install topojson-client --save
```

```bash
npm install @types/topojson-client --save-dev
```

- Let's install the _composite projections_ project to display the Canary Island just below spain.

```bash
npm install d3-composite-projections --save
```

- Since we are going to use _require_ let's import _node_ typings.

```bash
npm install @types/node --save-dev
```

- Let's remove part of the boilerplate test code:

_./index.ts_

```diff
- svg
-  .append("text")
-  .attr("x", 100)
-  .attr("y", 100)
-  .text("Hello d3js");

-svg
-  .append("circle")
-  .attr("r", 20)
-  .attr("cx", 20)
-  .attr("cy", 20);
```

- Let's change the size of the svg we are using and add some background color:

```diff
const svg = d3
  .select("body")
  .append("svg")
+  .attr("width", 1024)
-  .attr("width", 500)
+  .attr("height", 800)
-  .attr("height", 500);
+  .attr("style", "background-color: #FBFAF0");
```

- Now we need the data to draw spain map by regions, you can obtain it in this address:

- Let's obtain as well the population density by municipality:

- Let's import topojson, and import the map info we have downloaded

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
