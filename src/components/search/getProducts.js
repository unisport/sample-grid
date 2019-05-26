const URL = `https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429`;
export function getItems() {
  return fetch(URL).then(response => response.json());
}
