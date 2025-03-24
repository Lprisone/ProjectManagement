import React from "react";

export const mock = [
  {
    productNo: "12231213321",
    company: "ANTD_GROUP",
    serviceContent: "PAY",
    projectStatus: "OK",
    cost: "12000000",
    price: "1233445845",
    finishTime: "2025/03/24",
  },
];

export const flowColumns = (
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
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "时间",
      dataIndex: "finishTime",
      key: "finishTime",
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
              查看详情
            </a>
          </div>
        );
      },
    },
  ];
};
