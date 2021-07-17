export default async function handleResponse(response) {
  const data = await response.json();

  if(!response.ok) {
    const message = (data && data.message) || response.statusText;

    throw new Error(message);
  }

  return data;
}