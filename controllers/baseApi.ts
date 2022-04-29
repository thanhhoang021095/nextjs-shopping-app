import axios from 'axios';
import baseUrl from "./baseUrl"

interface IBaseAPI {
    get: (url: string, toke?:string) => Promise<Record<string, any>>;
    post: (url: string, body: Record<string, any>, token?:string) => Promise<Record<string, any>>;
    put: (url: string, body: Record<string, any>, token?:string) => Promise<Record<string, any>>;
    delete: (url: string, body: Record<string, any>, token?:string) => Promise<Record<string, any>>;
}

const handleCallApiWithOptions = (method = "GET", url = "",  token = "", body = {},):any => {
  
  let options: any = {
    method,
    headers: {
      'content-type': 'application/json',
      Authorization: token && token.length ? `Bearer ${token}` : '',
    },
    data: JSON.stringify(body),
    url: baseUrl + url,
  }
  
  // if (method !== "GET") options["data"] = JSON.stringify(body);
  return axios(options);
}

const handleResponse = (res: any): any => {
  if (res && res.status === 200) {
    return res.data.data
  }
};
class BaseApi implements IBaseAPI {
  // Method GET
  async get(url: string, token = ""): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('get', url, token);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }

  // Method POST
  async post(url: string, body: Record<string, any>, token = ""): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('POST', url, token, body);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
  // Method PUT
  async put(url: string, body: Record<string, any>, token = ""): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('PUT', url, token, body);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
  // Method DELETE
  async delete(url: string, body: Record<string, any>, token = ""): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('DELETE', url, token, body);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
}

const api = new BaseApi();
export default api;
