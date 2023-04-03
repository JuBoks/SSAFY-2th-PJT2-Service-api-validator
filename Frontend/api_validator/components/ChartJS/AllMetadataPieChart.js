import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { GetApisAllTestcase, GetLogsGraphAction } from "@/util/api";
import { ResultDayData } from "@/constants/apiTestResultSampleDay";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export function AllMetadataPieChart(props) {
  const now = new Date().toISOString();
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString();

  const [data, setData] = useState(ResultDayData);
  const [title, setTitle] = useState("title");
  const [none, setNone] = useState(false);

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
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const idToken = localStorage.getItem("idToken");

      const datas = (await GetLogsGraphAction(idToken, yesterday, now)).data
        .data;

      const item = datas[datas.length - 1];
      const passCnt = item.pass_cnt;
      const failCnt = item.fail_cnt;

      setTitle(item.count_date);

      if (passCnt === 0 && failCnt === 0) setNone(true);
      else setNone(false);

      const result = {
        labels: ["Pass", "Fail"],
        datasets: [
          {
            label: "cnt",
            data: [passCnt, failCnt],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
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
    <Box>
      {none ? (
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h6">No Data</Typography>
        </Box>
      ) : (
        <Pie data={data} options={options} />
      )}
    </Box>
  );
}
