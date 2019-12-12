export const getData = endpoint =>
  fetch(endpoint).then(res => {
    if (!res.ok) throw new Error(`Failed to retrieve ${endpoint}`);
    return res.json();
  });
