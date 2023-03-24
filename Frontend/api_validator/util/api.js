import axios from "axios";

const api = axios.create({
  baseURL: "https://j8s002.p.ssafy.io/api",
});

export const GetUsers = async (idToken) => {
  const res = await api.get("/users", {
    headers: {
      idtoken: idToken,
    },
  });
  return res;
};

export const PostUsers = async (reqData) => {
  const res = await api.post("/users", reqData);
  return res;
};

export const PatchUsers = async (idToken, uidValue, stateValue, typeValue) => {
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
  const res = await api.patch("/users", ...reqData);
  return res;
};

export const DeleteUsersUid = async (idToken, uid) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.delete("/users/" + String(uid), headers);
  return res;
};

export const GetUsersDuplicateEmail = async (email) => {
  const res = await api.get("/users/duplicate/" + email);
  return res;
};
