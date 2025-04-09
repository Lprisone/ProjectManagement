import React from "react";
import dayjs from "dayjs";

export interface Iprops {
  detailScoure: any;
}

export const childColumns = () => {
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
  ];
};
