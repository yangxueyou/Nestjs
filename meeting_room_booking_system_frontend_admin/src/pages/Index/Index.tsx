import { UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import "./index.css";
import { Link } from "react-router-dom";

export function Index() {
  return (
    <div id="index-container">
      <div className="header">
        {/* 注意没有写 to 的时候，会爆红 */}
        <Link to={"/"}>
          <h1>会议室预定系统-后台管理</h1>
        </Link>
        <Link to={"/user/info_modify"}>
          <UserOutlined className="icon" />
        </Link>
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
