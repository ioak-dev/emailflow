/* eslint-disable import/prefer-default-export */
import { RELOAD_ENDPOINTS } from './types';
import { httpGet } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';

export const allTemplates = (space, authorization) => dispatch => {
  httpGet(`${constants.API_URL_TEMPLATE}/${space}`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    console.log(response.data.data);
    dispatch({
      type: RELOAD_ENDPOINTS,
      payload: { endpoints: response.data.data },
    });
  });
};
