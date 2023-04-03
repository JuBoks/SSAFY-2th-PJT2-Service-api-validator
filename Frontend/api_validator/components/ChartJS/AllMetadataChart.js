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
import auth from "@/util/auth";
import { apiTestSample } from "@/constants/apiTestSample";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { GetFavoritesTestTermStartEnd, GetLogsGraphAction } from "@/util/api";
import { onAuthStateChanged } from "firebase/auth";

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

  const [intervalTime, setIntervalTime] = useState(1);
  const [data, setData] = useState(apiTestSample);

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

      const response = await GetFavoritesTestTermStartEnd(idToken, +intervalTime, Date.parse(startTime) / 1000 , Date.parse(endTime) / 1000);
      const datas = response? response.data : [];
      
      datas.map((item) => {
        labels.push(item.time);
        
        if (item.pass_cnt === 0 && item.fail_cnt) {
          passData.push(0);
          failData.push(0);
        } else {
          passData.push(
            (+item.pass_cnt / (+item.pass_cnt + +item.fail_cnt)) * 100
            );
            failData.push(
              (+item.fail_cnt / (+item.pass_cnt + +item.fail_cnt)) * 100
          );
        }
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
}, []);

console.log(data);

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
