/**项目管理 */
import React, { useState } from "react";
import { Input, Table, DatePicker } from "antd";
// import "./index.scss";
import { mock, projectColumns } from "./constants";
import ViewProjectDetails from './Components/ViewProjectDetails';

const { RangePicker } = DatePicker;

const ProjectManagement = () => {
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
          columns={projectColumns(setViewVisable, setGetInfo)}
          pagination={false}
        />
      </div>
      <div className="flow-footer"></div>
      <ViewProjectDetails
        scoure={getInfo}
        viewVisable={viewVisable}
        setViewVisable={setViewVisable}
      />
    </div>
  );
};

export default ProjectManagement;
