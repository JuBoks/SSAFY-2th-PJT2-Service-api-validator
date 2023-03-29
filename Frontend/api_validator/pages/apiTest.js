import React, { useState } from "react";
import * as api from "@/util/api.js";

export default function apiTest() {
  const handleTestClick = async () => {
    const idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi67CV7IOB7JqwIiwic3RhdGUiOjIsInR5cGUiOjEsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zYXBpdi0zZmIyNCIsImF1ZCI6InNhcGl2LTNmYjI0IiwiYXV0aF90aW1lIjoxNjgwMDUxNDQ2LCJ1c2VyX2lkIjoiYklqNEE4UzA1Q2JtcU1XcWd4NWRQUm5NQzhuMSIsInN1YiI6ImJJajRBOFMwNUNibXFNV3FneDVkUFJuTUM4bjEiLCJpYXQiOjE2ODAwNzIxMzIsImV4cCI6MTY4MDA3NTczMiwiZW1haWwiOiJicmlhbnBzdzk2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJyaWFucHN3OTZAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.es2CIcZUc47G-_KXuJ2lIjfHh_9KEbju1ZdOk2CfBsxD8c8LfApfVpyqqQVrTMF9t06godaZ5ibiNDeQH0c2LjOPTgCjktGdIyt0l-wJPPorQpvGdJb7h6tu1tCOnw2nofoFqVCS60Z1M0WUNxhqvgJgEPdXoMAPIEHRqDmndj54krBdBHNts3DTHXXoOsSQWuS6fkQLUQXhUKmU5IlXqbNZzcGuiolA7__ugcakMGRZxBtBXtK81xToZwj5oHYKZNdcaGFWWih4OYVxVLNt3DPMxDW5rixyYXYAwEEp2nMUneHsZpG3JvOQrXqPaSN1iR18Wta-kebu1PIRCA3RWQ";
    const result = await api.GetUsers(idToken, 1);
    console.log(result.data);
  };
  return (
    <>
      <button onClick={handleTestClick}>API Test</button>
    </>
  );
}
