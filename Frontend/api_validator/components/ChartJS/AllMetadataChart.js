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
import { GetLogsGraphAction } from "@/util/api";
import { cycleList } from "@/constants/cycleList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function AllMetadataChart(props) {
  const { title } = props;

  const [intervalTime, setIntervalTime] = useState(1);
  const [data, setData] = useState(apiTestSample);
  const [unit, setUnit] = useState("day");

  const [loading, setLoading] = useState(false);

  let now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  // let startTimeMonth = new Date(
  //   new Date().setMonth(new Date().getMonth() - intervalTime)
  // );
  // startTimeMonth.setHours(0);
  // startTimeMonth.setMinutes(0);
  // startTimeMonth.setSeconds(0);
  // startTimeMonth.setMilliseconds(0);

  let startTime = new Date(
    new Date().setDate(new Date().getDate() - 7 * intervalTime)
  );
  startTime.setHours(0);
  startTime.setMinutes(0);
  startTime.setSeconds(0);
  startTime.setMilliseconds(0);

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
  // const handleWeekChang = (newValue) => setIntervalWeek(newValue);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const idToken = localStorage.getItem("idToken");
      const labels = [];
      const passData = [];
      const failData = [];
      const notExecuteData = [];

      const datas = (
        await GetLogsGraphAction(
          idToken,
          startTime.toISOString(),
          now.toISOString(),
          unit === "month" ? 1 : null,
          unit === "week" ? 1 : null,
          unit === "day" ? 1 : null
        )
      ).data.data;

      datas.map((item) => {
        labels.push(item.count_date);
        if (
          item.pass_cnt === 0 &&
          item.fail_cnt === 0 &&
          item.unexcuted_cnt === 0
        ) {
          passData.push(0);
          failData.push(0);
          notExecuteData.push(0);
        } else {
          passData.push(
            (item.pass_cnt /
              (item.pass_cnt + item.fail_cnt + item.unexcuted_cnt)) *
              100
          );
          failData.push(
            (item.fail_cnt /
              (item.pass_cnt + item.fail_cnt + item.unexcuted_cnt)) *
              100
          );
          notExecuteData.push(
            (item.unexcuted_cnt /
              (item.pass_cnt + item.fail_cnt + item.unexcuted_cnt)) *
              100
          );
        }
      }, []);

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
          {
            label: "N/E",
            data: notExecuteData,
            backgroundColor: "lightgray",
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
        <Box display="flex">
          <Autocomplete
            sx={{ width: 150 }}
            options={cycleList}
            value={intervalTime}
            getOptionLabel={(option) => option + " week"}
            id="intervalTime"
            onChange={(event, newValue) => handleIntervalChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />

          {/* <Autocomplete
            sx={{ width: 150 }}
            options={cycleList}
            value={intervalWeek}
            getOptionLabel={(option) => option + " week"}
            id="intervalTimeWeek"
            onChange={(event, newValue) => handleWeekChang(newValue)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          /> */}
        </Box>

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
