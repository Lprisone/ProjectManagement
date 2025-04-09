/**项目管理 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Input,
  Table,
  DatePicker,
  Pagination,
  Button,
  Select,
  Popconfirm,
  Form,
} from "antd";
import "./index.scss";
import { initeScoure, projectColumns, paymentRatio } from "./constants";
import ViewProjectDetails from "./Components/ViewProjectDetails";
import FlowDeatil from "./Components/FlowDetail";
import { postRequest, getRequest } from "src/utils";
import _ from "lodash";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const deleteBatchUrl = "/projectRegister/deleteProject";
const checkDataUrl = "/projectRegister/selectProjectRegister";
const infoUrl = "/projectRegister/sumProject";

const ProjectManagement = () => {
  const [getInfo, setGetInfo] = useState<any>({});
  const [viewVisable, setViewVisable] = useState<boolean>(false);
  const [projectScoure, setProjectScoure] = useState<any>();
  const [headFilter, setHeadFilter] = useState<any>({ ...initeScoure });
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [projectInfo, setProjectInfo] = useState<any>();

  const requestDetail = useCallback(
    _.debounce(async () => {
      const param = {
        ...headFilter,
      };
      const res = await postRequest(param, checkDataUrl);
      setProjectScoure(res?.data);
    }, 300),
    [headFilter]
  );

  const searchInfo = useCallback(
    _.debounce(async () => {
      const param = {
        startDate: dayjs(headFilter.startDate)?.format("YYYY-MM-DD 00:00:00"),
        endDate: dayjs(headFilter.endDate)?.format("YYYY-MM-DD 23:59:59"),
      };
      const res = await getRequest(param, infoUrl);
      setProjectInfo(res?.data);
    }, 300),
    [headFilter]
  );

  useEffect(() => {
    requestDetail();
    searchInfo();
  }, [headFilter]);

  const handleBatchDelete = async () => {
    await postRequest(selectedKeys, deleteBatchUrl);
    requestDetail();
  };

  const handleDelete = async (id: string[]) => {
    await postRequest(id, deleteBatchUrl);
    requestDetail();
  };

  return (
    <div className="project-container">
      <div className="project-head-statistics-info">
        <div className="project-head-statistics-info-title">统计信息</div>
        <Form>
          <div className="project-head-statistics-info-box">
            <div
              className="project-head-statistics-info-item"
              style={{ background: "#87e8de" }}
            >
              <Form.Item label="项目支出（项目归属人）">
                <span>{_.get(projectInfo, "totalCostToOwner", "-")}</span>
              </Form.Item>
              <Form.Item label="项目支出（分包方）">
                <span>{_.get(projectInfo, "totalCostToSubcon", "-")}</span>
              </Form.Item>
              <Form.Item label="项目支出（工程师）">
                <span>{_.get(projectInfo, "totalCostToEngineer", "-")}</span>
              </Form.Item>
            </div>
            <div className="project-head-statistics-info-item-count">
              <Form.Item label="项目总数">
                <span>{_.get(projectInfo, "projectCount", "-")}</span>
              </Form.Item>
            </div>
            <div
              className="project-head-statistics-info-item"
              style={{ background: "#b7eb8f" }}
            >
              <Form.Item label="总成本">
                <span>{_.get(projectInfo, "totalCost", "-")}</span>
              </Form.Item>
              <Form.Item label="总售价">
                <span> {_.get(projectInfo, "totalPrice", "-")}</span>
              </Form.Item>
              <Form.Item label="总利润">
                <span>{_.get(projectInfo, "totalNetProfit", "-")}</span>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className="project-filter">
        <RangePicker
          className="project-filter-picker"
          value={[
            headFilter.startDate ? dayjs(headFilter.startDate) : null,
            headFilter.endDate ? dayjs(headFilter.endDate) : null,
          ]}
          onChange={(dates) => {
            if (dates && dates.length === 2) {
              setHeadFilter({
                ...headFilter,
                startDate: dayjs(dates[0])?.format("YYYY-MM-DD 00:00:00"),
                endDate: dayjs(dates[1])?.format("YYYY-MM-DD 23:59:59"),
              });
            } else {
              setHeadFilter({
                ...headFilter,
                startDate: null,
                endDate: null,
              });
            }
          }}
        />
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
          onClick={() => setViewVisable(true)}
        >
          新增项目
        </Button>
      </div>
      <div className="project-body">
        <Table
          dataSource={projectScoure?.projectVosList}
          columns={projectColumns(setViewVisable, setGetInfo, handleDelete)}
          expandable={{
            expandedRowRender: (record) => (
              <FlowDeatil
                detailScoure={record?.financialRecordList}
                requestDetail={requestDetail}
                searchInfo={searchInfo}
              />
            ),
          }}
          rowKey={"id"}
          rowSelection={{
            onChange: (e) => setSelectedKeys(e),
          }}
          pagination={false}
        />
      </div>
      <div className="project-footer">
        <div className="project-footer-action">
          <Popconfirm title="是否确定删除" onConfirm={handleBatchDelete}>
            <Button>批量删除</Button>
          </Popconfirm>
        </div>
        <div className="project-footer-page">
          <Pagination
            size="small"
            total={projectScoure?.totalCount}
            showSizeChanger={true}
            pageSize={headFilter?.pageSize}
            current={headFilter?.page}
            onChange={(pageNum, pageSize) => {
              setSelectedKeys([]);
              setHeadFilter({ ...headFilter, pageSize, pageNum });
            }}
          />
        </div>
      </div>
      <ViewProjectDetails
        scoure={getInfo}
        setScoure={setGetInfo}
        viewVisable={viewVisable}
        setViewVisable={setViewVisable}
        requestDetail={requestDetail}
      />
    </div>
  );
};

export default ProjectManagement;
