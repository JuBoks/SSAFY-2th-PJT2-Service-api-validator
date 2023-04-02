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
import { GetLogsGraphMetadatasId } from "@/util/api";
import { apiTestSample } from "@/constants/apiTestSample";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function MetadataChart(props) {
  const { title, metaId, startTime, endTime } = props;

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

      const response = await GetLogsGraphMetadatasId(
        idToken,
        metaId,
        startTime,
        endTime,
        unit === "month" ? 1 : null,
        unit === "week" ? 1 : null,
        unit === "day" ? 1 : null
      );
      const datas = response.data.data;

      datas.map((item) => {
        labels.push(item.count_date);
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
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Box display="flex" flexDirection="row-reverse">
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={(event, newValue) => setUnit(newValue)}
          aria-label="Time Unit"
        >
          <ToggleButton value="month">월</ToggleButton>
          <ToggleButton value="week">주</ToggleButton>
          <ToggleButton value="day">일</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {loading ? (
        <></>
      ) : (
        <Box width="100%">
          <Bar options={options} data={data} />
        </Box>
      )}
    </Box>
  );
}
