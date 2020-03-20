# Pimp Chart

"You nailed it!" the boss said, that's great, buuuuut... he asked as well if
we can just pimp a bit the chart, it is going to be published on an online
newspaper and it needs some details like add a legend to the chart, highlight
the selected party when we make a mouse hover, ...

Something like:

![pimped chart](./content/chart.png "pimped chart")

Live demo: [codesandbox](https://codesandbox.io/s/fervent-lumiere-8w12q)

# Steps

- We will take as starting sample _03-arc-chart_.

- Let's copy the content from _03-arc-chart_ and execute _npm install_

```bash
npm install
```

- Let's install _d3-svg-legend_

```bash
npm i d3-svg-legend -S
```

- Let's import this legend in our _index.ts_ file.

_./src/index.ts_

```diff
import * as d3 from "d3";
import { resultCollectionSpainNov19 } from "./data";
+ import {legendColor} from 'd3-svg-legend';
```

- Now let's create and ordinal scale color,map it to a legend object and add it in a group below the semi arch chart.

_./src/index.ts_

```typescript
// Legend
var ordinal = d3
  .scaleOrdinal()
  .domain(politicalPartiesKeys)
  .range(partiesColor);

var legendOrdinal = legendColor().scale(ordinal);

const legendLeft = margin.left;
const legendTop = radius + 5;

const legendGroup = svg
  .append("g")
  .attr("transform", `translate(${legendLeft},${legendTop})`);

legendGroup.call(legendOrdinal);
```

- Let's go for one more goodie, we want to highlight the piece of arc where the mouse point
  is on.

```diff
arcs
  .append("path")
  .attr("d", <any>arc) // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825
  .attr("fill", (d, i) => partiesColor[i]); // TODO color ordinal
+ .on("mouseover", function(d, i) {
+   d3.select(this).attr("transform", `scale(1.1, 1.1)`);
+ })
+  .on("mouseout", function(d, i) {
+    d3.select(this).attr("transform", ``);
+  });
```

# Excercise

A) We have shown a legend where all elements are in single columns, what if we want to split them in two columns?

- We could use two legends objects and split the colors / domain.
- We could play creating our custom legend.

Tips: https://stackoverflow.com/questions/51520596/spread-d3-js-legend-on-two-columns/51524137
Tips: http://jsfiddle.net/v7mkg/1/

B) Play a bit... add a rectangle, interact when clicking on a given arc (e.g. display tooltip)...

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
