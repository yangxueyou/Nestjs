import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import cookies from "js-cookie";

export function Index() {
  const [headPic, setHeadPic] = useState();

  useEffect(() => {
    const userInfo = cookies.get("userInfo");
    const accessToken = cookies.get("asscessToken");
    const refreshToken = cookies.get("refreshToken");
    
    if (!userInfo) {
      window.location.href = "/login";
    }
    if (userInfo) {
      const info = JSON.parse(userInfo);
      setHeadPic(info.headPic);
    }

    if (userInfo && accessToken && refreshToken) {
      localStorage.setItem("user_info", userInfo);
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      cookies.remove("userInfo");
      cookies.remove("accessToken");
      cookies.remove("refreshToken");
    }
  }, []);

  return (
    <div id="index-container">
      <div className="header">
        <h1>会议室预定系统</h1>
        <Link to={"/user/info_modify"}>
          {headPic ? (
            <img src={headPic} width={40} height={40} className="icon" />
          ) : (
            <UserOutlined className="icon" />
          )}
        </Link>
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
