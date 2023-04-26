import request from './request.js';

export async function getSetting() {
  const resp = await request.get('/api/setting');
  return resp;
}
