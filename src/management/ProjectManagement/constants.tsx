import React from "react";

export const initeScoure = {
  pageNum: 1,
  pageSize: 10,
  transactionTarget: undefined,
  amountType: undefined,
  invoiceStatus: undefined,
  inOutAccount: undefined,
  productNo: undefined,
  projectOwner: undefined,
  paymentRatio: undefined,
};

export const paymentRatio = ["全款", "非全款"];

export const projectColumns = (
  setViewVisable: (val: boolean) => void,
  setGetInfo: (val: any) => void
) => {
  return [
    {
      title: "产品编号",
      dataIndex: "productNo",
      key: "productNo",
    },
    {
      title: "客户",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "服务内容",
      dataIndex: "serviceContent",
      key: "serviceContent",
    },
    {
      title: "状态",
      dataIndex: "projectStatus",
      key: "projectStatus",
    },
    {
      title: "成本",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "售价",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "开案时间",
      dataIndex: "finishTime",
      key: "startTime",
    },
    {
      title: "结案时间",
      dataIndex: "finishTime",
      key: "finishTime ",
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
            >
              编辑
            </a>
          </div>
        );
      },
    },
  ];
};
