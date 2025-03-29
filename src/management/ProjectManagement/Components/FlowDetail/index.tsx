import React from "react";
import { Table } from "antd";
import { childColumns } from "./constants";

const FlowDeatil = () => {
  return <Table dataSource={[]} columns={childColumns()} pagination={false} />;
};

export default FlowDeatil;
