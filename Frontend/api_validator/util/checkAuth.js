import { getAuth, onAuthStateChanged } from "firebase/auth";
import auth from "./auth";
import router from "next/router";
import axios from "axios";

const url = "http://70.12.246.220:3000";
const isAuthorize = false;

const GetUsers = async (userUid) => {
  const res = await axios.get(url + "/api/users", {
    headers: {
      uid: userUid,
    },
  });

  isAuthorize = true;

  if (res.data.state !== 0) {
    router.push("/");
  }
};

onAuthStateChanged(auth, (user) => {
  console.log(auth);
  if (user) {
    const uid = user.uid;
    GetUsers(uid);
  } else {
    console.log("User is Signed Out");
  }
});

export default isAuthorize;
