# Pimp Chart

"You nailed it!" the boss said, that's great, buuuuut... he asked as well if
we can just pimp a bit the chart, it is going to be published on an online
newspaper and it needs some details like add a legend to the chart...

Something like:

![pimped chart](./content/chart.png "pimped chart")

Live demo: [codesandbox]()

# Steps

- We will take as starting sample _02B-single-bar-stack-layout_.

- Let's copy the content from _02B-single-bar-stack-layout_ and execute _npm install_

```bash
npm install
```

- Let's install _d3-svg-legend_

```bash
npm i d3-svg-legend -S
```

-

```diff
import * as d3 from "d3";
import { resultCollectionSpainNov19 } from "./data";
+ import {legendColor} from 'd3-svg-legend'
```

- Now let's create and ordinal scale color,map it to a legend object and add it in a group below the semi arch chart.

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

# Additional resources

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
