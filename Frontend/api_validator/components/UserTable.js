import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import auth from "@/util/auth";
import { PatchUsers, DeleteUsersUid } from "@/util/api";
import Modal from "@mui/material/Modal";
import styles from "@/styles/Admin.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6F6F6A",
  boxShadow: 24,
  p: 4,
};

function createData(email, name, type, state, uid) {
  return {
    email,
    name,
    type,
    state,
    uid,
  };
}

export default function UserTable(props) {
  const { userData } = props;

  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");

  // Table 행
  const rows = userData.map((item) =>
    createData(item.email, item.name, item.type, item.state, item.uid)
  );

  // Type 변경 이벤트
  const handleTypeChange = async (props) => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      await PatchUsers(idToken, props.target.name, null, props.target.value);
      alert("타입이 정상적으로 변경되었습니다.");
      location.reload();
    } catch (error) {
      console.log(error.code);
      alert(error.code);
    }
  };

  // state 변경 이벤트
  const handleStateChange = async (props) => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      await PatchUsers(idToken, props.target.name, props.target.value, null);
      alert("상태가 정상적으로 변경되었습니다.");
      location.reload();
    } catch (error) {
      console.log(error.code);
      alert(error.code);
    }
  };

  // 계정 삭제 버튼 이벤트
  const handleDeleteClick = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      console.log(uid);
      await DeleteUsersUid(idToken, uid);
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleOpen = (props) => {
    setOpen(true);
    setUid(props.target.name);
  };
  const handleClose = () => setOpen(false);

  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">
                <FormControl>
                  <Select
                    name={row.uid}
                    value={row.type}
                    onChange={handleTypeChange}
                  >
                    <MenuItem value={0}>Client Developer</MenuItem>
                    <MenuItem value={1}>Server Developer</MenuItem>
                    <MenuItem value={2}>QA</MenuItem>
                    <MenuItem value={3}>etc</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="right">
                <FormControl>
                  <Select
                    id="type-id"
                    name={row.uid}
                    value={row.state}
                    onChange={handleStateChange}
                  >
                    <MenuItem value={0}>Guest</MenuItem>
                    <MenuItem value={1}>Maintainer</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={3}>Owner</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  name={row.uid}
                  onClick={handleOpen}
                >
                  계정 삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="subtitle1">계정을 삭제하시겠습니까?</Typography>
          <Box display="flex" flexDirection="row-reverse">
            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteClick}
            >
              계정 삭제
            </Button>
          </Box>
        </Box>
      </Modal>
    </TableContainer>
  );
}
