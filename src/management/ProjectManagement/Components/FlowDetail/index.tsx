import React from "react";
import { Table } from "antd";
import { childColumns, Iprops } from "./constants";

const FlowDeatil = (props: Iprops) => {
  const { detailScoure } = props;
  return <Table dataSource={detailScoure} columns={childColumns()} pagination={false} />;
};

export default FlowDeatil;
