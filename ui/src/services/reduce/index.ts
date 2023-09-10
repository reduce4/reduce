
  
  // @ts-ignore
  /* eslint-disable */
  import { request } from '@umijs/max';

  
  export async function saveStudyMerials(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/studyMerials", {
      method: "PUT",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function studyMerials(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/studyMerials", {
      method: "POST",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function removeStudyMerials(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/studyMerials", {
      method: "DELETE",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function saveSituations(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/situations", {
      method: "PUT",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function situations(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/situations", {
      method: "POST",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function removeSituations(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/situations", {
      method: "DELETE",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function saveLLM(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/llms", {
      method: "PUT",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function llms(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/llms", {
      method: "POST",
      data: body,
      ...(options || {}),
    });
  }
      

  export async function removeLLMS(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/llms", {
      method: "DELETE",
      data: body,
      ...(options || {}),
    });
  }
      
  