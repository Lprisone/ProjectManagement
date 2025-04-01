/**项目管理 */
import React, { useState } from "react";
import { Input, Table, DatePicker, Pagination, Button, Select } from "antd";
import "./index.scss";
import { initeScoure, projectColumns, paymentRatio } from "./constants";
import ViewProjectDetails from "./Components/ViewProjectDetails";
import FlowDeatil from "./Components/FlowDetail";

const { RangePicker } = DatePicker;
const { Option } = Select;

const mock = [
  {
    productNo: "xxxx",
  },
];

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
        <div className="project-filter-item">
          <span>项目编号：</span>
          <Input
            className="project-fliter-search"
            placeholder="请输入项目编号"
            onChange={(e) => {
              setHeadFilter({
                ...headFilter,
                productNo: e?.target?.value,
              });
            }}
          />
        </div>
        <div className="project-filter-item">
          <span>客户：</span>
          <Input
            className="project-fliter-search"
            placeholder="请输入客户"
            onChange={(e) => {
              setHeadFilter({
                ...headFilter,
                company: e?.target?.value,
              });
            }}
          />
        </div>
        <div className="project-filter-item">
          <span>项目归属人：</span>
          <Input
            className="project-fliter-search"
            placeholder="请输入项目归属人"
            onChange={(e) => {
              setHeadFilter({
                ...headFilter,
                projectOwner: e?.target?.value,
              });
            }}
          />
        </div>
        <div className="project-filter-item">
          <span>付款比例：</span>
          <Select
            className="project-fliter-search"
            allowClear
            placeholder="请选择付款比例"
            onChange={(e) => {
              setHeadFilter({
                ...headFilter,
                paymentRatio: e,
              });
            }}
          >
            {paymentRatio.map((item) => {
              return (
                <Option value={item} title={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </div>
        <Button
          className="project-fliter-add-btn"
          type="primary"
          // onClick={() => setUserVisable(true)}
        >
          新增项目
        </Button>
      </div>
      <div className="project-body">
        <Table
          dataSource={mock}
          columns={projectColumns(setViewVisable, setGetInfo)}
          expandable={{
            expandedRowRender: (record) => <FlowDeatil detailScoure={[]} />,
            onExpandedRowsChange: (expandedRows) =>
              console.log("e", expandedRows),
          }}
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
