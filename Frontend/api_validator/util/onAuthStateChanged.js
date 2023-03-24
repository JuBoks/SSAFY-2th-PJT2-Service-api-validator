import auth from "@/util/auth";
import { onAuthStateChanged } from "firebase/auth";
import { GetUsers } from "./api";

export default onAuthStateChanged(auth, async (user) => {
  let res = null;
  console.log(user);
  if (user) {
    const idToken = await auth.currentUser.getIdToken(true);
    res = await GetUsers(idToken);
  }

  return res;
});
