import { apiHost } from '../config';
import handleResponse from './helper/handleResponse';

export async function apiGetCurrGroup() {
  const data = await fetch(
    apiHost + '/chordgroup/curr',
    {
      method: 'GET',
      credentials: 'include'
    }
  );
  return handleResponse(data);
}