/** MENU */
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import "./index.scss";
import PriceSheet from '../PriceSheet'

type MenuItem = Required<MenuProps>["items"][number];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    { key: "priceSheet", icon: <PieChartOutlined />, label: "报价表" },
    { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
    { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  ];

  return (
    <div className="management-container">
      <div className="management-container-menu">
        <Menu
          defaultSelectedKeys={["priceSheet"]}
          defaultOpenKeys={["报价表"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
        <div
          className="management-container-menu-switch"
          onClick={toggleCollapsed}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className="management-container-body">
        <PriceSheet />
      </div>
    </div>
  );
};

export default App;
