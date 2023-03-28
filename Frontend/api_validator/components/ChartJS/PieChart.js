import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart(props) {
  const { data, title } = props;

  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
    },
  };
  return <Pie data={data} options={options} />;
}
