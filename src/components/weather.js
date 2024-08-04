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

export function precipPlot(forecast, {width, height} = {}) {
  return Plot.plot({
    title: "Hourly precipitation % forecast",
    width,
    height,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Precip %"},
    marks: [
      Plot.lineY(forecast.properties.periods, {
        x: "startTime",
        y: (d) => d.probabilityOfPrecipitation.value,
        z: null, // varying color, not series
        // stroke: "probabilityOfPrecipitation",
        curve: "step-after"
      })
    ]
  });
}