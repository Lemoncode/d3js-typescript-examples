# Barchart

We are going to simulate that we have just started working on a local newspaper (we are d3js noob) our boss asked us to generate a chart
showing national elections results (we will evolve this charts in the following examples).

First we are going to start creating a Bar Chart form scratch (we won't get benefit of any already built in layout), this will serve
us to learn the basics of d3js.

# Steps

- Let's copy the content from the previous example (00-boiler-plate).

```bash
npm install
```

- We have the data available under the path _./src/data.ts_ (in case your resources are stored in a remote location d3js offers you help to load _csv_, _tsv_, _json_ and other formats from a remote source). We will start by removing part of the current code stored in index.ts:

_./src/index.ts_

```diff
import * as d3 from "d3";

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

- svg
-  .append("text")
-  .attr("x", 100)
-  .attr("y", 100)
-  .text("Hello d3js");
-
-svg
-  .append("circle")
-  .attr("r", 20)
-  .attr("cx", 20)
-  .attr("cy", 20);
```

- Let's import the data that we need:

_./src/index.ts_

```diff
import * as d3 from "d3";
+ import {resultCollectionSpainNov19} from './data';
```

- Let's start building our chart step by step, first we have to select all the rectangles under the SVG
  we are working on (our barchart is composed of rectangles, if we have other rectangles that we don't
  want to get involved we can use a group to isolate them).

```diff
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

+ svg
+  .selectAll("rect")
```

- After selecting all the existing rectangles binded to our data (the first time we render none will exists),
  we are going to expose the data we wan to represent (the array of voting results).

_./src/index.ts_

```diff
svg
  .selectAll("rect")
+  .data(resultCollectionSpainNov19)
```

> In d3js when we talk about **data** we are talking about an array of items, when we talk about
> **datum** we are reffering to a single item.

- Since it's all the data that we are going to introduce is fresh (we are not updating the chart just appending
  all the new data), we tell them that we go into "enter" mode (if you need to "update" existing data you would
  enter in "update" mode, if you want to delete data you would enter in "exit" mode).

```diff
svg
  .selectAll("rect")
  .data(resultCollectionSpainNov19)
+ .enter()
```

- Now for every entry we are going to create a rectangle, with a given width and height:

```diff
svg
  .selectAll("rect")
  .data(resultCollectionSpainNov19)
  .enter()
+  .append("rect")
+  .attr("width", 50)
+  .attr("height", d => d.seats);
  ;
```

- If we run the sample we will see that a single ugly black rectangle is shown, why? because
  we are creating a fix width rectangle per item in the same X position. Let's add some
  offset to each of the bar charts. In this case on the _x_ attribute we get a function
  that contain the current enty information (datum party/seats), and the position (index)
  in the array of data.

```diff
svg
  .selectAll("rect")
  .data(resultCollectionSpainNov19)
  .enter()
  .append("rect")
  .attr("width", 50)
  .attr("height", d => d.seats);
+ .attr("x", (d,i) => i * 60)
  ;
```

- Now we got something more interesting, a flipped barchart. Why the Barchart is shown top to bottom?
  That's because the coordinate origin starts in (0,0), we should tell d3 to start the rectangle in a
  bottom coordinate, right now we will enter a harcoded number offset number and substract the seats
  position, in the next step we will fix this by
  introducing scales.

```diff
svg
  .selectAll("rect")
  .data(resultCollectionSpainNov19)
  .enter()
  .append("rect")
  .attr("width", 50)
  .attr("height", d => d.seats);
  .attr("x", (d,i) => i * 60)
+  .attr("y", (d) => 200 - d.seats)
  ;
```

- Now the chart is not flipped, but we are getting an strange feeling, ... we are calculating seats, what would
  happen if the measure we would be handling is for instance millions of habitants, ... we don't have enough
  pixels to display this :), is time to learn about how to scale values, in this case:
  - We know that the number of seats available is 350 (if we don't know that value, we can just calculate
    it iterating over the data entry array) .
  - We know that we got available 300 pixels of height space.
  - d3js offers us several scaling helpers, we are going to use _scaleLinear_ maps from vaues to pixels

```diff
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

+ const yScale = d3.scaleLinear().domain(0, 350).range([0, 300]);
```
