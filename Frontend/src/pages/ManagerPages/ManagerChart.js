import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Red Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "# of Blue Votes",
      data: [2, 3],
      backgroundColor: "rgb(54, 162, 235)",
    },
    {
      label: "# of Green Votes",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "#1",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "Black",
    },
    {
      label: "#2",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "Black",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  responsive: true,
  maintainAspectRatio: false,
};

const GroupedBar = () => (
  <>
    <div style={{ minHeight: 475 }}>
      <Bar data={data} options={options} />
    </div>
  </>
);

export default GroupedBar;
