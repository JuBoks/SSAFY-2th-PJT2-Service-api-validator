const labels = [
  "2022.02.01",
  "2022.02.02",
  "2022.02.03",
  "2022.02.04",
  "2022.02.05",
  "2022.02.06",
  "2022.02.07",
  "2022.02.08",
  "2022.02.09",
  "2022.02.10",
  "2022.02.11",
  "2022.02.12",
  "2022.02.13",
  "2022.02.14",
  "2022.02.15",
  "2022.02.16",
  "2022.02.17",
  "2022.02.18",
  "2022.02.19",
  "2022.02.20",
  "2022.02.21",
  "2022.02.22",
  "2022.02.23",
  "2022.02.24",
  "2022.02.25",
  "2022.02.26",
  "2022.02.27",
  "2022.02.28",
  "2022.02.29",
  "2022.02.30",
];

export const sampleData = {
  labels,
  datasets: [
    {
      label: "Pass",
      data: [
        80, 70, 60, 50, 40, 80, 70, 60, 50, 40, 80, 70, 60, 50, 40, 80, 70, 60,
        50, 40, 80, 70, 60, 50, 40, 80, 70, 60, 50, 40,
      ],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Fail",
      data: [
        10, 20, 30, 40, 50, 10, 20, 30, 40, 50, 10, 20, 30, 40, 50, 10, 20, 30,
        40, 50, 10, 20, 30, 40, 50, 10, 20, 30, 40, 50,
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "N/E",
      data: [
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      ],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};
