import React from "react";
import { Popconfirm, Tooltip } from "antd";
import dayjs from "dayjs";
import { AppstoreTwoTone } from "@ant-design/icons";

export const flowColumns = (
  setViewVisable: (val: boolean) => void,
  setGetInfo: (val: any) => void,
  handleDelete: (val: number[]) => void,
  handleGroup: () => void
) => {
  return [
    {
      title: () => {
        return (
          <>
            商品编号
            <Tooltip title="分组">
              <AppstoreTwoTone
                className="flow-table-group"
                onClick={handleGroup}
              />
            </Tooltip>
          </>
        );
      },
      dataIndex: "projectNo",
      key: "projectNo",
    },
    {
      title: "水单日期",
      dataIndex: "financialRecordsDate",
      key: "financialRecordsDate",
      render: (text: string) => {
        return dayjs(text)?.format("YYYY-MM-DD");
      },
    },
    {
      title: "账单金额",
      dataIndex: "billAmount",
      key: "billAmount",
    },
    {
      title: "交易对象",
      dataIndex: "transactionTarget",
      key: "transactionTarget",
    },
    {
      title: "款项类型",
      dataIndex: "amountType",
      key: "amountType",
    },
    {
      title: "发票状态",
      dataIndex: "invoiceStatus",
      key: "invoiceStatus",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "进出帐",
      dataIndex: "inOutAccount",
      key: "inOutAccount",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_text: any, record: any) => {
        return (
          <div>
            <a
              onClick={() => {
                setViewVisable(true);
                setGetInfo(record);
              }}
              className="flow-body-table-action-editor"
            >
              编辑
            </a>
            <Popconfirm
              title="是否确认删除该流水信息"
              onConfirm={() => handleDelete([record?.id])}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};

const startOfYear = dayjs().startOf("year").format("YYYY-MM-DD HH:mm:ss");
const endOfToday = dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");

export const initeScoure = {
  pageNum: 1,
  pageSize: 10,
  transactionTarget: undefined,
  amountType: undefined,
  invoiceStatus: undefined,
  inOutAccount: undefined,
  startDate: startOfYear,
  endDate: endOfToday,
};
