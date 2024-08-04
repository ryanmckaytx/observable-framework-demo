---
theme: dashboard
toc: false
---
# Weather report

```js
const forecast = await FileAttachment("./data/forecast.json").json();
display(forecast)
```

```js
import {temperaturePlot} from "./components/weather.js";
import {precipPlot} from "./components/weather.js";
```

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => temperaturePlot(forecast, {width}))}</div>
  <div class="card">${resize((width) => precipPlot(forecast, {width}))}</div>
</div>