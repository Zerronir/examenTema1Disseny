"use strict";

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [{
      data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
      lineTension: 0,
      backgroundColor: "transparent",
      borderColor: "#007bff",
      borderWidth: 4,
      pointBackgroundColor: "#007bff"
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: !1
        }
      }]
    },
    legend: {
      display: !1
    }
  }
});
var ctx = document.querySelector("#" + xc);
var xc = "myChart";