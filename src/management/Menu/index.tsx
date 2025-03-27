/** MENU */
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Menu, ConfigProvider } from "antd";
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
import PriceSheet from "../PriceSheet";
import FlowManagement from "../FlowManagement";
import ProjectManagement from "../ProjectManagement";
import zhCN from "antd/es/locale/zh_CN"; // 中文语言包
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 引入 Day.js 的中文语言包

dayjs.locale("zh-cn"); // 设置 Day.js 的语言为中文

type MenuItem = Required<MenuProps>["items"][number];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [componentField, setComponentField] =
    useState<string>("priceSheet"); // 组件转换

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    { key: "flowManagement", icon: <DesktopOutlined />, label: "流水管理" },
    { key: "priceSheet", icon: <PieChartOutlined />, label: "报价表" },
    {
      key: "projectManagement",
      icon: <ContainerOutlined />,
      label: "项目管理",
    },
    {
      key: "customerManagement",
      icon: <ContainerOutlined />,
      label: "客户管理",
    },
  ];

  const renderComponets = (type: string) => {
    switch (type) {
      case "priceSheet":
        return <PriceSheet />;
      case "flowManagement":
        return <FlowManagement />;
      case "projectManagement":
        return <ProjectManagement />;
      case "customerManagement":
        return <></>;
    }
  };

  return (
    <div className="management-container">
      <div className="management-container-menu">
        <Menu
          defaultSelectedKeys={["priceSheet"]}
          defaultOpenKeys={["priceSheet"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          onClick={(item: any) => setComponentField(item?.key)}
        />
        <div
          className="management-container-menu-switch"
          onClick={toggleCollapsed}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className="management-container-body">
        <ConfigProvider locale={zhCN}>
          {renderComponets(componentField)}
        </ConfigProvider>
      </div>
    </div>
  );
};

export default App;
