import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OutlinedCard from "./OutlinedCard";

export default function TabControl(props) {
  const [value, setValue] = React.useState("1");
  const flatProps = {
    json: props.json,
    schema: props.schema,
  };

  const tabListAPI = [
    {
      label: "Schema",
      value: "1",
    },
    {
      label: "Response",
      value: "2",
    },
  ];
  const tabPanelListAPI = [
    {
      value: "1",
      content: <OutlinedCard json={flatProps.schema} />,
    },
    {
      value: "2",
      content: <OutlinedCard json={flatProps.json} />,
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = tabListAPI.map((item) => (
    <Tab key={item.label} label={item.label} value={item.value} />
  ));

  const tabPanels = tabPanelListAPI.map((item) => (
    <TabPanel key={item.value} value={item.value}>
      {item.content}
    </TabPanel>
  ));

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="tabContext">
            {tabs}
          </TabList>
        </Box>
        {tabPanels}
      </TabContext>
    </Box>
  );
}
