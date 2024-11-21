import axios from "axios";
import { message } from "antd";
import { UserInfo } from "../pages/InfoModify/InfoModify";
import { UpdatePassword } from "../pages/PasswordModify/PasswordModify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 3000,
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("access_token");

  //   自动添加 authorization 的 header
  if (accessToken) {
    config.headers.authorization = "Bearer " + accessToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let { data, config } = error.response;
    // 自动 refresh token
    if (data.code === 401 && !config.url.includes("/user/admin/refresh")) {
      const res = await refreshToken();

      if (res.status === 200 || res.status === 201) {
        return axiosInstance(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else {
      // 接口返回 400 的时候，axios 会抛异常
      // 返回 error.response 而不是 Promise.reject(error.response)
      return error.response;
    }
  }
);

async function refreshToken() {
  const res = await axiosInstance.get("/user/admin/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);
  return res;
}

export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/admin/login", {
    username,
    password,
  });
}

export async function userSearch(
  username: string,
  nickName: string,
  email: string,
  pageNo: number,
  pageSize: number
) {
  return await axiosInstance.get("/user/list", {
    params: {
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    },
  });
}

export async function freeze(id: number) {
  return await axiosInstance.get("/user/freeze", {
    params: {
      id,
    },
  });
}

export async function getUserInfo() {
  return await axiosInstance.get("/user/info");
}

export async function updateInfo(data: UserInfo) {
  return await axiosInstance.post("/user/admin/update", data);
}

export async function updateUserInfoCaptcha() {
  return await axiosInstance.get("/user/update/captcha");
}

export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: email,
    },
  });
}

export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/admin/update_password", data);
}