import axios from "axios";

const url = "https://j8s002.p.ssafy.io/api";

const GetUsers = async (idToken) => {
  const res = await axios.get(url + "/users", {
    headers: {
      idtoken: idToken,
    },
  });
  return res;
};

const PostUsers = async (reqData) => {
  const res = await axios.post(url + "/users", reqData);
  return res;
};

const PatchUsers = async (idToken, uidValue, stateValue, typeValue) => {
  let reqData = "";
  if (stateValue === null) {
    reqData = [
      {
        uid: uidValue,
        type: parseInt(typeValue),
      },
      {
        headers: {
          idtoken: idToken,
        },
      },
    ];
  } else {
    reqData = [
      {
        uid: uidValue,
        state: parseInt(stateValue),
      },
      {
        headers: {
          idtoken: idToken,
        },
      },
    ];
  }
  const res = await axios.patch(url + "/users", ...reqData);
  return res;
};

const DeleteUsersUid = async (idToken, uid) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await axios.delete(url + "/users/" + String(uid), headers);
  return res;
};

const GetUsersDuplicateEmail = async (email) => {
  const res = await axios.get(url + "/users/duplicate/" + email);
  return res;
};

export {
  GetUsers,
  PostUsers,
  GetUsersDuplicateEmail,
  PatchUsers,
  DeleteUsersUid,
};
