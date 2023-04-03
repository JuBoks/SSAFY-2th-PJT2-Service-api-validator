import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEB_BECKEND_ADDRESS,
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

export const GetUsersAuthorize = async (idToken) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get("/users/authorize", headers);
  return res;
};

export const PostApis = async (idToken, domain_id, method, resources) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    domain_id,
    method,
    resources,
  };
  const res = await api.post("/apis", reqData, headers);
  return res;
};

export const GetApis = async (idToken, domainId) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/apis?domainId=${domainId}`, headers);
  return res;
};

export const PostApisTest = async (
  idToken,
  url,
  method,
  headers,
  params,
  data
) => {
  const reqHeaders = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    url,
    headers,
    params,
    data,
    method,
  };
  const res = await api.post("/apis/test", reqData, reqHeaders);
  return res;
};

export const GetApisId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/apis/${id}`, headers);
  return res;
};

export const PatchApisId = async (
  idToken,
  id,
  domain_id,
  method,
  resources
) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    domain_id,
    method,
    resources,
  };
  const res = await api.patch(`/apis/${id}`, reqData, headers);
  return res;
};

export const DeleteApisId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.delete(`/apis/${id}`, headers);
  return res;
};

export const GetApisAllTestcase = async (idToken) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/apis/all/testcase`, headers);
  return res;
};

export const GetApisAllTestcaseId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/apis/all/testcase` + `/${id}`, headers);
  return res;
};

export const PostFavorites = async (idToken, apis) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    apis,
  };
  const res = await api.post(`/favorites`, reqData, headers);
  return res;
};

export const GetFavorites = async (idToken) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/favorites`, headers);
  return res;
};

export const GetFavoritesTestTermStartEnd = async (
  idToken,
  term,
  start,
  end
) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/favorites/test/${term}/${start}/${end}`, headers);
  return res;
};

export const DeleteFavoritesId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.delete(`/favorites/${id}`, headers);
  return res;
};

export const PostCategories = async (idToken, name, note) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    name,
    note,
  };
  const res = await api.post(`/categories`, reqData, headers);
  return res;
};

export const GetCategories = async (idToken) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(`/categories`, headers);
  return res;
};

export const GetCategoriesId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(`/categories/${id}`, headers);
  return res;
};

export const PatchCategoriesId = async (idToken, id, name, note) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    name,
    note,
  };
  const res = await api.patch(`/categories/${id}`, reqData, headers);
  return res;
};

export const DeleteCategoriesId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.delete(`/categories/${id}`, headers);
  return res;
};

export const PostDomains = async (idToken, category_id, name, domain) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    category_id,
    name,
    domain,
  };
  const res = await api.post(`/domains`, reqData, headers);
  return res;
};

export const GetDomains = async (idToken, categoryId) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(`/domains?categoryId=${categoryId}`, headers);
  return res;
};

export const GetDomainsId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(`/domains/${id}`, headers);
  return res;
};

export const PatchDomainsId = async (
  idToken,
  id,
  category_id,
  name,
  domain
) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    category_id,
    name,
    domain,
  };
  const res = await api.patch(`/domains/${id}`, reqData, headers);
  return res;
};

export const DeleteDomainsId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.delete(`/domains/${id}`, headers);
  return res;
};

export const PostMetadatas = async (
  idToken,
  api_id,
  header,
  params,
  body,
  name,
  cycle_time
) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    api_id,
    header,
    params,
    body,
    name,
    cycle_time,
  };
  const res = await api.post(`/metadatas`, reqData, headers);
  return res;
};

export const GetMetadatas = async (idToken, apiId) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/metadatas/?apiId=${apiId}`, headers);
  return res;
};

export const PostMetadatasTestId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.post(`/metadatas/test/${id}`, headers);
  return res;
};

export const PostMetadatasExpectId = async (idToken, id, response) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    response,
  };
  const res = await api.post(`/metadatas/expect/${id}`, reqData, headers);
  return res;
};

export const GetMetadatasId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.get(`/metadatas/${id}`, headers);
  return res;
};

export const PatchMetadatasId = async (
  idToken,
  id,
  api_id,
  header,
  params,
  body,
  name,
  cycle_time
) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    api_id,
    header,
    params,
    body,
    name,
    cycle_time,
  };
  const res = await api.patch(`/metadatas/${id}`, reqData, headers);
  return res;
};

export const DeleteMetadatasId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const res = await api.delete(`/metadatas/${id}`, headers);
  return res;
};

export const PostAlerts = async (idToken, apis) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };
  const reqData = {
    apis,
  };
  const res = await api.post(`/alerts`, reqData, headers);
  return res;
};

export const GetAlerts = async (idToken) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(`/alerts`, headers);
  return res;
};

export const GetAlertsId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(`/alerts/${id}`, headers);
  return res;
};

export const DeleteAlertsId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.delete(`/alerts/${id}`, headers);
  return res;
};

export const GetLogs = async (idToken, startTime, endTime, metaId) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(
    `/logs/?startTime=${startTime}&endTime=${endTime}&metaId=${metaId}`,
    headers
  );
  return res;
};

export const GetLogsId = async (idToken, id) => {
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(`/logs/${id}`, headers);
  return res;
};

export const GetLogsGraphAction = async (
  idToken,
  startTime,
  endTime,
  month,
  week,
  day
) => {
  let query;
  if (month) {
    query = `month=${month}`;
  } else if (week) {
    query = `week=${week}`;
  } else if (day) {
    query = `day=${day}`;
  } else {
    query = `day=1`;
  }
  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(
    `/logs/graph/action?startTime=${startTime}&endTime=${endTime}&${query}`,
    headers
  );
  return res;
};

export const GetLogsGraphMetadatasId = async (
  idToken,
  id,
  startTime,
  endTime,
  month,
  week,
  day
) => {
  let query;
  if (month) {
    query = `month=${month}`;
  } else if (week) {
    query = `week=${week}`;
  } else if (day) {
    query = `day=${day}`;
  } else {
    query = `day=1`;
  }

  const headers = {
    headers: {
      idtoken: idToken,
    },
  };

  const res = await api.get(
    `/logs/graph/metadatas/${id}?startTime=${startTime}&endTime=${endTime}&${query}`,
    headers
  );
  return res;
};
