import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import auth from "@/util/auth";
import { PatchUsers, DeleteUsersUid } from "@/util/api";
import Modal from "@mui/material/Modal";
import styles from "@/styles/Admin.module.css";
import { DataGrid } from "@mui/x-data-grid";

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

function createData(id, email, name, type, state, uid) {
  return {
    id,
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

  const columns = [
    { field: "id", headerName: "No.", width: 100 },
    { field: "email", headerName: "이메일", width: 300 },
    { field: "name", headerName: "이름", width: 250 },
    {
      field: "type",
      headerName: "역할",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <FormControl fullWidth>
            <Select
              fullWidth
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              value={cellValues.row.type}
              onChange={(event) => {
                handleTypeChange(cellValues.row.uid, event);
              }}
            >
              <MenuItem value={0}>Client Developer</MenuItem>
              <MenuItem value={1}>Server Developer</MenuItem>
              <MenuItem value={2}>QA</MenuItem>
              <MenuItem value={3}>etc</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "state",
      headerName: "권한",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <FormControl fullWidth>
            <Select
              value={cellValues.row.state}
              fullWidth
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              onChange={(event) => {
                handleStateChange(cellValues.row.uid, event);
              }}
            >
              <MenuItem value={0}>Guest</MenuItem>
              <MenuItem value={1}>Maintainer</MenuItem>
              <MenuItem value={2}>Admin</MenuItem>
              <MenuItem value={3}>Owner</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 150,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="error"
            onClick={(event) => {
              handleOpen(cellValues.row.uid, event);
            }}
          >
            계정 중지
          </Button>
        );
      },
    },
  ];

  // Table 행
  const rows = userData.map((item, index) =>
    createData(
      index + 1,
      item.email,
      item.name,
      item.type,
      item.state,
      item.uid
    )
  );

  // Type 변경 이벤트
  const handleTypeChange = async (uid, event) => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      await PatchUsers(idToken, uid, null, event.target.value);
      location.reload();
      alert("타입이 정상적으로 변경되었습니다.");
    } catch (error) {
      //console.log(error.code);
      alert(error.code);
    }
  };

  // state 변경 이벤트
  const handleStateChange = async (uid, event) => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      await PatchUsers(idToken, uid, event.target.value, null);
      location.reload();
      alert("상태가 정상적으로 변경되었습니다.");
    } catch (error) {
      //console.log(error.code);
      alert(error.code);
    }
  };

  // 계정 삭제 버튼 이벤트
  const handleDeleteClick = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      await DeleteUsersUid(idToken, uid);
      setOpen(false);
      location.reload();
      alert("계정 삭제가 완료되었습니다.");
    } catch (error) {
      //console.log(error);
      alert(error);
    }
  };

  const handleOpen = (uid, event) => {
    setOpen(true);
    setUid(uid);
    //console.log(uid);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box className={styles.dataGrid}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
      />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="subtitle1">계정을 중지하시겠습니까?</Typography>
          <Box display="flex" flexDirection="row-reverse">
            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteClick}
            >
              계정 중지
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
