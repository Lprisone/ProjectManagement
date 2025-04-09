import React from "react";
import dayjs from "dayjs";
import { Popconfirm } from "antd";

export interface Iprops {
  detailScoure: any;
  requestDetail: () => void;
  searchInfo: () => void;
}

export const childColumns = (
  setViewVisable: any,
  setGetInfo: any,
  handleDelete: any
) => {
  return [
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
      title: "进出账",
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
              style={{marginRight: '10px'}}
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
