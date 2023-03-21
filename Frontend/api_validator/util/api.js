import axios from "axios";

class API {
  constructor() {
    this.url = "http://70.12.246.220:3000/api";
  }

  async GetUsers(idToken) {
    console.log("idToken:", idToken);
    return (res = await axios.get(this.url + "/users", {
      headers: {
        idToken: idToken,
      },
    }));
  }
}

export default API;
