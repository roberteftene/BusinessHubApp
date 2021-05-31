import React from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
};

function VerticalBarBookings(props) {
  const data = {
    labels: ["9 - 12", "12 - 15", "15 - 18", "18 - 21", "21 >"],
    datasets: [
      {
        label: "Popular times",
        data: [
          props.graphicData.nineTo12,
          props.graphicData.twelveTo3,
          props.graphicData.threeTo6,
          props.graphicData.sixTo9,
          props.graphicData.past9,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
}

export default VerticalBarBookings;
