import axios from "axios";

export default async function customFetch(
  url,
  method = "GET",
  data = {},
  customeHeaders = {}
) {
  const headers = {
    "content-type": "application/json",
    ...customeHeaders,
  };
  let response;
  let options = {
    method,
    url,
    data,
    headers,
  };
  try {
    response = await axios(options);
  } catch (e) {
    response = e.response;
  }

  return response;
}
