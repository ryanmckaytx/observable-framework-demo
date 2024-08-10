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
        curve: "step-after",
        tip: true
      })
    ]
  });
}

// TODO: figure out how to pull this out into a library
function arealine(data, {color, fillOpacity = 0.1, ...options} = {}) {
    return Plot.marks(
      Plot.ruleY([0]),
      Plot.areaY(data, {fill: color, fillOpacity, ...options}),
      Plot.lineY(data, {stroke: color, tip: true, ...options})
    );
  }

export function precipPlot(forecast, {width, height} = {}) {
  return Plot.plot({
    title: "Hourly precipitation % forecast",
    width,
    height,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Precip %"},
    marks: [
      arealine(forecast.properties.periods, {
        x: "startTime", 
        y: (d) => d.probabilityOfPrecipitation.value,
        color: "blue"
      })
    ]
  });
}