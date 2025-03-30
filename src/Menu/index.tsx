import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate, // 导入 Navigate 组件
} from "react-router-dom";
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
import PriceSheet from "src/management/PriceSheet";
import FlowManagement from "src/management/FlowManagement";
import ProjectManagement from "src/management/ProjectManagement";
import CustomerManagement from "src/management/CustomerManagement";
import zhCN from "antd/es/locale/zh_CN"; // 中文语言包
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 引入 Day.js 的中文语言包

dayjs.locale("zh-cn"); // 设置 Day.js 的语言为中文

type MenuItem = Required<MenuProps>["items"][number];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

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

  return (
    <Router>
      <div className="management-container">
        {/* 左侧菜单 */}
        <div className="management-container-menu">
          <MenuWithNavigation items={items} collapsed={collapsed} />
          <div
            className="management-container-menu-switch"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="management-container-body">
          <ConfigProvider locale={zhCN}>
            <Content />
          </ConfigProvider>
        </div>
      </div>
    </Router>
  );
};

// 定义带导航功能的菜单组件
const MenuWithNavigation = ({ items, collapsed }: any) => {
  const navigate = useNavigate(); // 获取 navigate 函数

  return (
    <Menu
      defaultSelectedKeys={["flowManagement"]} // 设置默认选中项为 "流水管理"
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={items}
      onClick={(item) => {
        // 使用 navigate 导航到对应路径
        navigate(`/yitong-pro/insights/${item.key}`);
      }}
    />
  );
};

// 定义内容组件
const Content = () => {
  const renderComponets = (type: string) => {
    switch (type) {
      case "priceSheet":
        return <PriceSheet />;
      case "flowManagement":
        return <FlowManagement />;
      case "projectManagement":
        return <ProjectManagement />;
      case "customerManagement":
        return <CustomerManagement />;
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <Routes>
      {/* 默认路径重定向到流水管理 */}
      <Route path="/" element={<Navigate to="/yitong-pro/insights/flowManagement" />} />
      <Route
        path="/yitong-pro/insights/:componentField"
        element={<DynamicComponent renderComponets={renderComponets} />}
      />
      {/* 默认路径 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

// 动态组件加载逻辑
const DynamicComponent = ({ renderComponets }: any) => {
  const { componentField } = useParams();
  return renderComponets(componentField);
};

export default App;