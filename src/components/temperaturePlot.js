import * as Plot from "npm:@observablehq/plot";

export function temperaturePlot(forecast, {width, height} = {}) {
  return Plot.plot({
    title: "Hourly temperature forecast",
    width,
    height,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Degrees (F)"},
    marks: [
      Plot.lineY(forecast.properties.periods, {
        x: "startTime",
        y: "temperature",
        z: null, // varying color, not series
        stroke: "temperature",
        curve: "step-after"
      })
    ]
  });
}