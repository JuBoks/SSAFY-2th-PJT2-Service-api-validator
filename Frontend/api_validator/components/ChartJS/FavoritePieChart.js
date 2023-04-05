import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  GetApisAllTestcase,
  GetFavoritesTestTermStartEnd,
  GetLogsGraphAction,
} from "@/util/api";
import { ResultDayData } from "@/constants/apiTestResultSampleDay";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export function FavoritePieChart(props) {
  const now = Math.floor(new Date().getTime() / 1000.0);
  const startTime = Math.floor(
    new Date(new Date().setMonth(new Date().getMonth() - 3) / 1000.0)
  );

  const [data, setData] = useState(ResultDayData);
  const [title, setTitle] = useState("title");

  const [loading, setLoading] = useState(false);

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
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const idToken = localStorage.getItem("idToken");

      const datas = (
        await GetFavoritesTestTermStartEnd(idToken, 24, startTime, now)
      ).data;

      const item = datas[datas.length - 1];
      const passCnt = item.pass_cnt;
      const failCnt = item.fail_cnt;

      setTitle(item.time.substr(0, 10));

      const result = {
        labels: ["Pass", "Fail"],
        datasets: [
          {
            label: "cnt",
            data: [passCnt, failCnt],
            backgroundColor: [
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setData(result);
      setLoading(false);
    };

    getData();
  }, []);

  return loading ? (
    <></>
  ) : (
    <Box width="100%" height="100%">
      <Pie data={data} options={options} />
    </Box>
  );
}
