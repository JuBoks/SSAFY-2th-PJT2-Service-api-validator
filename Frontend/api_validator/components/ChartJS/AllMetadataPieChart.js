import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { GetApisAllTestcase, GetLogsGraphAction } from "@/util/api";
import { ResultDayData } from "@/constants/apiTestResultSampleDay";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export function AllMetadataPieChart(props) {
  const now = new Date().toISOString();
  let oneMonthAgo = new Date(new Date().setDate(new Date().getMonth() - 1));
  oneMonthAgo.setHours(0);
  oneMonthAgo.setMinutes(0);
  oneMonthAgo.setSeconds(0);
  oneMonthAgo.setMilliseconds(0);

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
        await GetLogsGraphAction(
          idToken,
          oneMonthAgo.toISOString(),
          now,
          null,
          null,
          1
        )
      ).data.data;

      const item = datas[datas.length - 1];
      const passCnt = item.pass_cnt;
      const failCnt = item.fail_cnt;
      const notExecuteData = item.unexcuted_cnt;

      setTitle(item.count_date);

      const result = {
        labels: ["Pass", "Fail", "N/E"],
        datasets: [
          {
            label: "cnt",
            data: [passCnt, failCnt, notExecuteData],
            backgroundColor: [
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "lightgray",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "lightgray",
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
