/**流水管理 */
import React, { use, useEffect, useState } from "react";
import { Input, Table, DatePicker, Button } from "antd";
import "./index.scss";
import { flowColumns, initeScoure } from "./constants";
import ViewDetails from "./Components/ViewDetails";
import { postRequest } from "../../utils";
import dayjs from "dayjs";
import _ from "lodash";

const { RangePicker } = DatePicker;
const queryDetailsUrl = "/financialRecord/getFinancialRecord"; // 请求列表
const querDeletesUrl = "/financialRecord/deleteFinancialRecord"; // 请求删除

const FlowManagement = () => {
  const [getInfo, setGetInfo] = useState<any>({});
  const [viewVisable, setViewVisable] = useState<boolean>(false);
  const [flowSource, setFlowSource] = useState<any>([]);
  const [headFilter, setHeadFilter] = useState<any>({ ...initeScoure }); // 初始化参数

  const handleDelete = async (ids: number[]) => {
    await postRequest(ids, querDeletesUrl);
    searchDeatil();
  };

  const searchDeatil = async () => {
    const param = {
      ...headFilter,
    };
    const res = await postRequest(param, queryDetailsUrl);
    setFlowSource(res?.data?.financialRecordVos);
  };

  useEffect(() => {
    searchDeatil();
  }, [headFilter]);

  useEffect(() => {
    searchDeatil();
  }, []);

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
        <RangePicker
          className="flow-fliter-picker"
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
        <Button
          className="flow-fliter-btn"
          type="primary"
          onClick={() => {
            setViewVisable(true);
            setGetInfo(undefined);
          }}
        >
          新增流水
        </Button>
      </div>
      <div className="flow-body">
        <Table
          dataSource={flowSource}
          columns={flowColumns(setViewVisable, setGetInfo, handleDelete)}
          pagination={false}
        />
      </div>
      <div className="flow-footer"></div>
      <ViewDetails
        scoure={getInfo}
        viewVisable={viewVisable}
        setViewVisable={setViewVisable}
        handleSearch={searchDeatil}
      />
    </div>
  );
};

export default FlowManagement;
