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
  Autocomplete,
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { GetFavoritesTestTermStartEnd, GetLogsGraphAction } from "@/util/api";
import { cycleList } from "@/constants/cycleList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function FavoriteChart(props) {
  const { title } = props;

  const labels = [];
  const passData = [];
  const failData = [];

  const [intervalTime, setIntervalTime] = useState(1);
  const [data, setData] = useState(apiTestSample);
  const [unit, setUnit] = useState(24);

  const [loading, setLoading] = useState(false);

  const now = Math.floor(new Date().getTime() / 1000.0);
  const startTime = Math.floor(
    new Date(
      new Date().setDate(new Date().getDate() - 7 * intervalTime) / 1000.0
    )
  );

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

  const handleIntervalChange = (newValue) => setIntervalTime(newValue);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const idToken = localStorage.getItem("idToken");

      const datas = (
        await GetFavoritesTestTermStartEnd(idToken, unit, startTime, now)
      ).data;

      datas.map((item) => {
        const passCnt = parseInt(item.pass_cnt);
        const failCnt = parseInt(item.fail_cnt);
        let unitTime = 10;
        if (unit === 672) unitTime = 7;

        labels.push(item.time.substr(0, unitTime));
        if (item.pass_cnt === 0 && item.fail_cnt === 0) {
          passData.push(0);
          failData.push(0);
        } else {
          passData.push((passCnt / (passCnt + failCnt)) * 100);
          failData.push((failCnt / (passCnt + failCnt)) * 100);
        }
      });

      const result = {
        labels,
        datasets: [
          {
            label: "Pass",
            data: passData,
            backgroundColor: "rgb(54, 162, 235)",
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
          <ToggleButton value={672}>월</ToggleButton>
          <ToggleButton value={168}>주</ToggleButton>
          <ToggleButton value={24}>일</ToggleButton>
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
