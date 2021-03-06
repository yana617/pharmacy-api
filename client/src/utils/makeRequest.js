const baseUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_DEV_BASE_URL
  : process.env.REACT_APP_BASE_URL;

const makeRequest = (url, options) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'GET',
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

export { makeRequest };
