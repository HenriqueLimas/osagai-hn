const API_BASE_URL = `https://api.hnpwa.com/v0/`;

export function getList({ type = "news", page = 1 } = {}) {
  return fetch(`${API_BASE_URL}${type}/${page}.json`)
    .then(res => res.json())
    .catch(error => console.error("Error on List API: ", error));
}
