import axios from 'axios';

const instance = axios.create({
  timeout: 60000,
  timeoutErrorMessage: 'Request took too long to respond, please try again',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json:charset=utf-8',
  },
});

// prettier-ignore
export default {
  getMarketPrices: async (url, params) => instance({
    method: 'GET',
    url,
    params,
  }),
};
