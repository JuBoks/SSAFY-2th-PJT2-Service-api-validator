import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { apiTestSample } from "@/constants/apiTestSample";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { GetLogsGraphAction } from "@/util/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function AllMetadataChart(props) {
  const { title, startTime, endTime } = props;

  const labels = [];
  const passData = [];
  const failData = [];

  const [data, setData] = useState(apiTestSample);
  const [unit, setUnit] = useState("day");

  const [loading, setLoading] = useState(false);

  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 25,
        },
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
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const idToken = localStorage.getItem("idToken");

      const datas = (await GetLogsGraphAction(idToken, startTime, endTime)).data
        .data;

      datas.map((item) => {
        labels.push(item.created_at);
        passData.push(item.pass_cnt);
        failData.push(item.fail_cnt);
      });

      const result = {
        labels,
        datasets: [
          {
            label: "Pass",
            data: passData,
            backgroundColor: "rgb(75, 192, 192)",
          },
          {
            label: "Fail",
            data: failData,
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      };
      setData(result);
      setLoading(false);
    };

    getData();
  }, [unit]);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      {loading ? (
        <></>
      ) : (
        <Box width="100%" height="100%" display="flex" justifyContent="center">
          <Bar options={options} data={data} />
        </Box>
      )}
    </Box>
  );
}
