import axios from "axios";
import { AxiosInstance } from "axios";
import ManageStorage from "./cookiesStorage";

const accesToken = () => ManageStorage.getItem("access_token");
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    "REACT_APP_API_URL is not defined in the environment variables"
  );
}

export const backEndURLWithAuth: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accesToken()}`,
    Accept: "application/json",
  },
  withCredentials: false,
});

export const backEndURLWithoutAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: false,
});

export const postApiWithoutAuth = async (url: string, body: object) => {
  try {
    const result = await backEndURLWithoutAuth.post(url, body);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const postApiWithAuth = async (url: string, body: any) => {
  backEndURLWithAuth.interceptors.request.use((config: any) => {
    return config;
  });
  try {
    const result = await backEndURLWithAuth.post(url, body, {
      headers: {
        Authorization: `Bearer ${accesToken()}`,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const postApiWithAuthFormData = async (url: string, body: any) => {
  backEndURLWithAuth.interceptors.request.use((config: any) => {
    return config;
  });
  try {
    const result = await backEndURLWithAuth.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accesToken()}`,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// GET request without authentication
export const getApiWithoutAuth = async (url: string) => {
  try {
    const result = await backEndURLWithoutAuth.get(url);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// GET request with authentication
export const getApiWithAuth = async (url: string) => {
  backEndURLWithAuth.interceptors.request.use((config: any) => {
    return config;
  });
  try {
    const result = await backEndURLWithAuth.get(url, {
      headers: {
        Authorization: `Bearer ${accesToken()}`,
      },
    });
    return result;
  } catch (error: any) {
    return error.response;
  }
};

// DELETE request without authentication
export const deleteApiWithoutAuth = async (url: string) => {
  try {
    const result = await backEndURLWithoutAuth.delete(url);
    return result;
  } catch (error: any) {
    return error.response.data;
  }
};

// DELETE request with authentication
export const deleteApiWithAuth = async (url: string) => {
  backEndURLWithAuth.interceptors.request.use((config: any) => {
    return config;
  });
  try {
    const result = await backEndURLWithAuth.delete(url, {
      headers: {
        Authorization: `Bearer ${accesToken()}`,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};
// DELETE request with authentication and body
export const deleteApiWithAuthAndBody = async (url: string, body: any) => {
  backEndURLWithAuth.interceptors.request.use((config: any) => {
    return config;
  });
  try {
    const result = await backEndURLWithAuth.delete(url, {
      data: body,
      headers: {
        Authorization: `Bearer ${accesToken()}`,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};
// PATCH request without authentication
export const patchApiWithoutAuth = async (url: string, body: object) => {
  try {
    const result = await backEndURLWithoutAuth.patch(url, body);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// PATCH request with authentication
export const patchApiWithAuth = async (url: string, body: any) => {
  backEndURLWithAuth.interceptors.request.use((config: any) => {
    return config;
  });
  try {
    const result = await backEndURLWithAuth.patch(url, body, {
      headers: {
        Authorization: `Bearer ${accesToken()}`,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};
// PUT request without authentication
export const putApiWithoutAuth = async (url: string, body: object) => {
  try {
    const result = await backEndURLWithoutAuth.put(url, body);
    return result;
  } catch (error: any) {
    return error.response.data;
  }
};

// PUT request with authentication
export const putApiWithAuth = async (url: string, body: any) => {
  backEndURLWithAuth.interceptors.request.use((config: any) => {
    return config;
  });
  try {
    const result = await backEndURLWithAuth.put(url, body, {
      headers: {
        Authorization: `Bearer ${accesToken()}`,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};
