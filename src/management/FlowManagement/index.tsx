/**流水管理 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Input,
  Table,
  DatePicker,
  Button,
  Form,
  Pagination,
  Select,
} from "antd";
import "./index.scss";
import { flowColumns, initeScoure } from "./constants";
import ViewDetails from "./Components/ViewDetails";
import { postRequest } from "src/utils";
import dayjs from "dayjs";
import _ from "lodash";
import {
  invoiceEnum,
  checkEnum,
} from "src/management/FlowManagement/Components/ViewDetails/constants";

const { RangePicker } = DatePicker;
const queryDetailsUrl = "/financialRecord/getFinancialRecord"; // 请求列表
const querDeletesUrl = "/financialRecord/deleteFinancialRecord"; // 请求删除
const sumUrl = "/financialRecord/sum/financialRecord"; // 请求统计

const { Option } = Select;

const FlowManagement = () => {
  const [getInfo, setGetInfo] = useState<any>({});
  const [viewVisable, setViewVisable] = useState<boolean>(false);
  const [flowSource, setFlowSource] = useState<any>([]);
  const [headFilter, setHeadFilter] = useState<any>({ ...initeScoure }); // 初始化参数
  const [statisticalInfo, setStatisticalInfo] = useState<any>({}); // 统计信息

  const handleGroup = useCallback(
    _.debounce(async () => {
      const param = {
        ...headFilter,
        groupBy: "projectNo",
      };
      const res = await postRequest(param, queryDetailsUrl);
      setFlowSource(res?.data);
    }, 300),
    [headFilter]
  );

  const handleDelete = async (ids: number[]) => {
    await postRequest(ids, querDeletesUrl);
    searchDeatil();
    searchStatistics();
  };

  const searchDeatil = useCallback(
    _.debounce(async () => {
      const param = {
        ...headFilter,
      };
      const res = await postRequest(param, queryDetailsUrl);
      setFlowSource(res?.data);
    }, 300),
    [headFilter]
  );

  const searchStatistics = useCallback(
    _.debounce(async () => {
      const param = {
        ...headFilter,
      };
      const res = await postRequest(param, sumUrl);
      setStatisticalInfo(res?.data);
    }, 300),
    [headFilter]
  );

  useEffect(() => {
    searchDeatil();
    searchStatistics();
  }, [headFilter]);

  const handleSetFilter = _.debounce((type: string, value: any) => {
    const updatedFilter = Object.keys(headFilter).reduce(
      (acc, key) => {
        acc[key] = key === type ? value : headFilter[key];
        return acc;
      },
      { ...headFilter }
    );

    setHeadFilter(updatedFilter);
  }, 300);

  return (
    <div className="flow-container">
      <div className="flow-head-statistics-info">
        <div className="flow-head-statistics-info-title">统计信息</div>
        <div className="flow-head-statistics-info-box">
          <div className="flow-head-statistics-info-item">
            <Form.Item label="本次记账周期">
              <span>
                {dayjs(_.get(statisticalInfo, "startDate"))?.format(
                  "YYYY-MM-DD"
                )}{" "}
                ~{" "}
                {dayjs(_.get(statisticalInfo, "endDate"))?.format("YYYY-MM-DD")}
              </span>
            </Form.Item>
            <Form.Item label="进账">
              <span>{_.get(statisticalInfo, "inAccountCount", "-")}</span>
            </Form.Item>
            <Form.Item label="出账">
              <span>{_.get(statisticalInfo, "outAccountCount", "-")}</span>
            </Form.Item>
            <Form.Item label="周期进出账小计">
              <span>{_.get(statisticalInfo, "inOutAccountCount", "-")}</span>
            </Form.Item>
          </div>
          <div className="flow-head-statistics-info-item">
            <Form.Item label="已开票（出）">
              <span> {_.get(statisticalInfo, "outInvoicedCount", "-")}</span>
            </Form.Item>
            <Form.Item label="已开票（进）">
              <span>{_.get(statisticalInfo, "inInvoicedCount", "-")}</span>
            </Form.Item>
            <Form.Item label="未开票（出）">
              <span>{_.get(statisticalInfo, "outInvoicedCount", "-")}</span>
            </Form.Item>
            <Form.Item label="未开票（进）">
              <span>{_.get(statisticalInfo, "inUninvoicedCount", "-")}</span>
            </Form.Item>
            <Form.Item label="不开票（进）">
              <span>{_.get(statisticalInfo, "noInInvoiceCount", "-")}</span>
            </Form.Item>
            <Form.Item label="不开票（出）">
              <span>{_.get(statisticalInfo, "noOutInvoiceCount", "-")}</span>
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="flow-filter">
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
        <Form.Item label="交易对象" className="flow-fliter-item">
          <Input
            className="flow-fliter-action"
            onChange={(e) => {
              handleSetFilter("transactionTarget", e?.target?.value);
            }}
            placeholder="请输入交易对象"
          />
        </Form.Item>
        <Form.Item label="款项类型" className="flow-fliter-item">
          <Input
            className="flow-fliter-action"
            onChange={(e) => {
              handleSetFilter("amountType", e?.target?.value);
            }}
            placeholder="请输入款项类型"
          />
        </Form.Item>
        <Form.Item label="发票状态" className="flow-fliter-item">
          <Select
            className="flow-fliter-status"
            allowClear
            placeholder="请选择发票状态"
            onChange={(e) => {
              handleSetFilter("invoiceStatus", e);
            }}
          >
            {invoiceEnum.map((item) => {
              return (
                <Option value={item} title={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="进出账" className="flow-fliter-item">
          <Select
            className="flow-fliter-status"
            onChange={(e) => {
              handleSetFilter("inOutAccount", e);
            }}
            placeholder="请选择进出账"
            allowClear
          >
            {checkEnum.map((item) => {
              return (
                <Option value={item} title={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
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
          dataSource={flowSource?.financialRecordVos}
          columns={flowColumns(
            setViewVisable,
            setGetInfo,
            handleDelete,
            handleGroup
          )}
          pagination={false}
        />
      </div>
      <div className="flow-footer">
        <div className="flow-footer-page">
          <Pagination
            size="small"
            total={flowSource?.totalCount}
            showSizeChanger={true}
            pageSize={headFilter?.pageSize}
            current={headFilter?.page}
            onChange={(pageNum, pageSize) => {
              setHeadFilter({ ...headFilter, pageSize, pageNum });
            }}
          />
        </div>
      </div>
      <ViewDetails
        scoure={getInfo}
        viewVisable={viewVisable}
        setViewVisable={setViewVisable}
        handleSearch={searchDeatil}
        searchStatistics={searchStatistics}
      />
    </div>
  );
};

export default FlowManagement;
