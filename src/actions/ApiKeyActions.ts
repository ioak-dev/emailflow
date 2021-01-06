/* eslint-disable import/prefer-default-export */
import { RELOAD_API_KEYS } from './types';
import { httpGet, httpPut } from '../components/Lib/RestTemplate';
import { sendMessage } from '../events/MessageService';
import constants from '../components/Constants';

const domain = 'apikey';

export const fetchAllApiKeys = (space, authorization) => dispatch => {
  httpGet(`${constants.API_URL_API_KEY}/${space}`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    dispatch({
      type: RELOAD_API_KEYS,
      payload: { apiKeys: response.data },
    });
  });
};
