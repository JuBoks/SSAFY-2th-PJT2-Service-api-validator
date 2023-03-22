import { getAuth, onAuthStateChanged } from "firebase/auth";
import auth from "./auth";
import router from "next/router";
import axios from "axios";

const url = "https://sapiv.site/api";
const isAuthorize = false;

const GetUsers = async (userUid) => {
  const res = await axios.get(url + "/users", {
    headers: {
      idToken: userUid,
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
