/**项目管理 */
import React, { useState } from "react";
import { Input, Table, DatePicker, Pagination } from "antd";
import "./index.scss";
import { initeScoure, projectColumns } from "./constants";
import ViewProjectDetails from "./Components/ViewProjectDetails";

const { RangePicker } = DatePicker;

const mock = [
  {
    productNo: 'xxxx'
  }
]

const ProjectManagement = () => {
  const [getInfo, setGetInfo] = useState<any>({});
  const [viewVisable, setViewVisable] = useState<boolean>(false);
  const [projectScoure, setProjectScoure] = useState<any>();
  const [headFilter, setHeadFilter] = useState<any>({ ...initeScoure });

  return (
    <div className="project-container">
      <div className="project-head-statistics-info">
        <div className="project-head-statistics-info-title">统计信息</div>
        <div className="project-head-statistics-info-box">
          <div className="project-head-statistics-info-item"></div>
          <div className="project-head-statistics-info-item"></div>
          <div className="project-head-statistics-info-item"></div>
          <div className="project-head-statistics-info-item"></div>
        </div>
      </div>
      <div className="project-filter">
        <Input className="project-fliter-search" placeholder="请输入关键字" />
      </div>
      <div className="project-body">
        <Table
          dataSource={mock}
          columns={projectColumns(setViewVisable, setGetInfo)}
          // expandable={{
          //   expandedRowRender: (record) => childTable(record),
          //   onExpandedRowsChange: (expandedRows) =>
          //     console.log("e", expandedRows),
          // }}
          pagination={false}
        />
      </div>
      <div className="project-footer">
        <div className="project-footer-page">
          <Pagination
            size="small"
            total={projectScoure?.totalCount}
            showSizeChanger={true}
            pageSize={headFilter?.pageSize}
            current={headFilter?.page}
            onChange={(pageNum, pageSize) => {
              setHeadFilter({ ...headFilter, pageSize, pageNum });
            }}
          />
        </div>
      </div>
      <ViewProjectDetails
        scoure={getInfo}
        viewVisable={viewVisable}
        setViewVisable={setViewVisable}
      />
    </div>
  );
};

export default ProjectManagement;
