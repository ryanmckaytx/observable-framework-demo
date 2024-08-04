---
theme: dashboard
toc: false
---
# Weather report

```js
const forecast = FileAttachment("./data/forecast.json").json();
```

```js
display(forecast)
```

```js
import {temperaturePlot} from "./components/temperaturePlot.js";
```

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => temperaturePlot(forecast, {width}))}</div>
</div>