import { httpDelete, httpGet, httpPost, httpPut } from './Lib/RestTemplate';
import constants from './Constants';

export const addApiKey = async (space, authorization, payload) => {
  const response = await httpPost(
    `${constants.API_URL_API_KEY}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};

export const getApiKeys = async (space, authorization) => {
  const response = await httpGet(
    `${constants.API_URL_API_KEY}/${space}`,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};

export const removeApiKey = async (space, authorization, id) => {
  const response = await httpDelete(
    `${constants.API_URL_API_KEY}/${space}/${id}`,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};
