import React, { useState } from "react";
import * as api from "@/util/api.js";

export default function apiTest() {
  const handleTestClick = async () => {
    const idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi7KCV7J2Y6raMIiwic3RhdGUiOjMsInR5cGUiOjAsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zYXBpdi0zZmIyNCIsImF1ZCI6InNhcGl2LTNmYjI0IiwiYXV0aF90aW1lIjoxNjgwMDUxMTQ5LCJ1c2VyX2lkIjoib3B4amMxQ003NWJRWjQzU2IybWkyNUtGa2NxMiIsInN1YiI6Im9weGpjMUNNNzViUVo0M1NiMm1pMjVLRmtjcTIiLCJpYXQiOjE2ODAwNjE1NDEsImV4cCI6MTY4MDA2NTE0MSwiZW1haWwiOiJqZWs5NDEyQG5hdmVyLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImplazk0MTJAbmF2ZXIuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.JYQMzqyiLW6fSYoLR2OVUyz8GbGUHYuIbkQFcYCdGR67x4x3-_mE3vdpBAO98wb5VkESqJxBwnAfdvWCYaFRj0Z9ZS7XHy1CZTNvT0--bGVr_sXnEXC5iNiZLwaSQXryjAWjvlqQBz4bWkHAEgXtkvs2M5tFRiHcJk13tl0EAIyyCc_35Bijr3-nUY8Jh-oRST6JToZKJ1SbGvBFjrXmLKi9ebJSFxZink7FtpsZpKwAZgg2KwE2GnhofzP8VN7lWxGF6nMDHUA9EMdiSPxSQ7yOWvB1t0uw4afSQ4OFSOzHSnE2m5i2yQNJhO0AI0nrV6rjL8j83t_oVqLb30Us9w";
    const result = await api.GetUsers(idToken);
    //console.log(result.data);
  };
  return (
    <>
      <button onClick={handleTestClick}>API Test</button>
    </>
  );
}
