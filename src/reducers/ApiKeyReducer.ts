import { RELOAD_API_KEYS } from '../actions/types';

const initialState = {
  apiKeys: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RELOAD_API_KEYS:
      console.log('RELOAD_API_KEYS reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
