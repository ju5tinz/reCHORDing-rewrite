import { apiHost } from '../config';
import handleResponse from './helper/handleResponse';

export async function apiAddChord(chord, groupId) {
  const data = await fetch(
    apiHost + '/chord',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chord, groupId }),
      credentials: 'include'
    }
  );
  return handleResponse(data);
}

export async function apiGetChord(groupId) {
  const data = await fetch(
    apiHost + `/chord?groupId=${groupId}`,
    {
      method: 'GET',
      credentials: 'include'
    }
  );
  return handleResponse(data);
}