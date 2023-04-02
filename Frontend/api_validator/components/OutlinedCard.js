import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import JSONDiff from '@/util/JSONDiff';

export default function OutlinedCard(props) {
 
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <JSONDiff 
          json = {props.json}
        />
      </CardContent>
    </Card>
  );
}
