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
import {
  Autocomplete,
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { cycleList } from "@/constants/cycleList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function MetadataChart(props) {
  const { title, metaId } = props;

  const [intervalTime, setIntervalTime] = useState(1);
  const [data, setData] = useState(apiTestSample);
  const [unit, setUnit] = useState("day");

  const [loading, setLoading] = useState(false);

  const now = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString();
  const startTime = new Date(
    new Date().setDate(new Date().getDate() - 7 * intervalTime)
  ).toISOString();

  const handleIntervalChange = (newValue) => setIntervalTime(newValue);

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
    maintainAspectRatio: false,
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

      const labels = [];
      const passData = [];
      const failData = [];

      const response = await GetLogsGraphMetadatasId(
        idToken,
        metaId,
        startTime,
        now,
        unit === "month" ? 1 : null,
        unit === "week" ? 1 : null,
        unit === "day" ? 1 : null
      );
      const datas = response.data.data;
      //console.log(datas);
      datas.map((item, index) => {
        labels.push(item.count_date);

        //console.log(datas.length);
        if (item.pass_cnt === 0 && item.fail_cnt === 0) {
          passData.push(0);
          failData.push(0);
        } else {
          passData.push(
            (item.pass_cnt / (item.pass_cnt + item.fail_cnt)) * 100
          );
          failData.push(
            (item.fail_cnt / (item.pass_cnt + item.fail_cnt)) * 100
          );
        }
      });

      const result = {
        labels,
        datasets: [
          {
            label: "Pass",
            data: passData,
            backgroundColor: "rgb(53, 162, 235)",
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
  }, [unit, intervalTime]);

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Autocomplete
          sx={{ width: 150 }}
          options={cycleList}
          value={intervalTime}
          getOptionLabel={(option) => option + " week"}
          id="intervalTime"
          disableClearable
          onChange={(event, newValue) => handleIntervalChange(newValue)}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
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
        <Box width="100%" height="100%" display="flex" justifyContent="center">
          <Bar options={options} data={data} />
        </Box>
      )}
    </Box>
  );
}
