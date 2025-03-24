/**流水管理 */
import React, { useState } from "react";
import { Input, Table, DatePicker } from "antd";
import "./index.scss";
import { mock, flowColumns } from "./constants";
import ViewDetails from "./Components/ViewDetails";

const { RangePicker } = DatePicker;

const FlowManagement = () => {
  const [getInfo, setGetInfo] = useState<any>({});
  const [viewVisable, setViewVisable] = useState<boolean>(false);

  return (
    <div className="flow-container">
      <div className="flow-head-statistics-info">
        <div className="flow-head-statistics-info-title">统计信息</div>
        <div className="flow-head-statistics-info-box">
          <div className="flow-head-statistics-info-item"></div>
          <div className="flow-head-statistics-info-item"></div>
          <div className="flow-head-statistics-info-item"></div>
          <div className="flow-head-statistics-info-item"></div>
        </div>
      </div>
      <div className="flow-filter">
        <Input className="flow-fliter-search" placeholder="请输入关键字" />
        <RangePicker className="flow-fliter-picker" />
      </div>
      <div className="flow-body">
        <Table
          dataSource={mock}
          columns={flowColumns(setViewVisable, setGetInfo)}
          pagination={false}
        />
      </div>
      <div className="flow-footer"></div>
      <ViewDetails
        scoure={getInfo}
        viewVisable={viewVisable}
        setViewVisable={setViewVisable}
      />
    </div>
  );
};

export default FlowManagement;
