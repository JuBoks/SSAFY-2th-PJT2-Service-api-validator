import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import JSONDiff from '@/util/JSONDiff';
import Typography from "@mui/material/Typography";

export default function OutlinedCard(props) {
 if(props.json){
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
 else{
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h6">{props.content}</Typography>
      </CardContent>
    </Card>
  );
 }
}
