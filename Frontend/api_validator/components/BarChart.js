import React from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["2023.03.01", "2023.03.02", "2023.03.03"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Pass",
      data: [80, 90, 70],
    },
    {
      label: "Fail",
      data: [(10, 5, 20)],
    },
    {
      label: "N/E",
      data: [10, 5, 10],
    },
  ],
};

export default function BarChart(props) {
  const config = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };

  return (
    <Box width={550} height={350} m={2}>
      <Bar data={data} config={config} />
    </Box>
  );
}
