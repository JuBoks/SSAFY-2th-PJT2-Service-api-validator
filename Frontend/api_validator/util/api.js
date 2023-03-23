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
  const reqData = {
    headers: {
      idtoken: idToken,
    },
    uid: uidValue,
    state: stateValue,
    type: typeValue,
  };
  const res = await axios.patch(url + "/users", reqData);
  return res;
};

const GetUsersDuplicateEmail = async (email) => {
  const res = await axios.get(url + "/users/duplicate/" + email);
  return res;
};

export { GetUsers, PostUsers, GetUsersDuplicateEmail, PatchUsers };
