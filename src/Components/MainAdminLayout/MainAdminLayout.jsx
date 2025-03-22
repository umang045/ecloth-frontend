import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
const { Content, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: "70px",
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  backgroundColor: "black",
  text: "white",
};

const MainAdminLayout = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle} className="rounded-lg text-white">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "adminUserList",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Users",
            },
            {
              key: "adminSellerList",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Sellers",
            },
            {
              key: "adminProductList",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Product List",
            },
            {
              key: "adminOrderList",
              icon: <FaClipboardList className="fs-4" />,
              label: "Order List",
            },
          ]}
          className="bg-gray-950 text-white"
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "5px 5px 0",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              height: "auto",
              padding: 24,
              //   textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainAdminLayout;
