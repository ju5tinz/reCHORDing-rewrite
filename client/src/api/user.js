import { apiHost } from '../config';
import handleResponse from './helper/handleResponse';

export async function apiRegisterUser(user) {
  const data = await fetch(
    apiHost + '/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      credentials: 'include'
    }
  );
  return handleResponse(data);
}

export async function apiLoginUser(user) {
  const data = await fetch(
    apiHost + '/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      credentials: 'include'
    }
  );
  return handleResponse(data);
}

export async function apiLogoutUser() {
  const data = await fetch(
    apiHost + '/logout',
    {
      method: 'POST',
      credentials: 'include'
    }
  );
  return handleResponse(data);
}