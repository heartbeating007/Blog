import request from './request';

export async function getMessage(page = 1, limit = 10) {
  const resp = await request.get('/api/message', {
    params: { page, limit }
  });
  return resp;
}

export async function postMessage(msgInfo) {
  const resp = await request.post('/api/message', msgInfo);
  return resp;
}
