import React from "react";
import type { GetProp, RadioChangeEvent, TableProps } from "antd";

type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;

export interface DataType {
  TO: string;
  addressee: string;
  phone: number;
  email: string;
  date: string;
  mark: string;
  invoiceTitle: string;
  invoiceMailingAddress: string;
  contactPerson: string;
  contactNumber: string;
  taxpayerIdentificationNumber: string;
  BankDeposit: string;
  accountNumber: string;
  processingMode: string;
}

export const tableColumns = (
  setInfoVisable: (value: boolean) => void,
  setCurrentInfo: (val: any) => void
) => {
  return [
    {
      title: "TO",
      dataIndex: "TO",
      key: "TO",
      render: (text, record) => text,
    },
    {
      title: "收件人",
      dataIndex: "addressee",
      key: "addressee",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "备注",
      dataIndex: "mark",
      key: "mark",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "发票抬头",
      dataIndex: "invoiceTitle",
      key: "invoiceTitle",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "发票邮寄地址",
      dataIndex: "invoiceMailingAddress",
      key: "invoiceMailingAddress",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "联系人",
      dataIndex: "contactPerson",
      key: "contactPerson",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "联系人电话",
      dataIndex: "contactNumber",
      key: "contactNumber",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "纳税人识别号",
      dataIndex: "taxpayerIdentificationNumber",
      key: "taxpayerIdentificationNumber",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "开户行",
      dataIndex: "BankDeposit",
      key: "BankDeposit",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "账号",
      dataIndex: "accountNumber",
      key: "accountNumber",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "处理方式",
      dataIndex: "processingMode",
      key: "processingMode",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <div>
          <a
            onClick={() => {
              setInfoVisable(true);
              setCurrentInfo(record);
            }}
          >
            编辑
          </a>
        </div>
      ),
    },
  ] as ColumnsType<DataType>;
};

export const mockData = [
  {
    TO: "123131",
    addressee: "chihiro",
    phone: "13312331331313",
    email: "xinlang@sina.com",
    date: "2025/03/09",
    mark: "这是一条侧式数据xzcxzcxzczc",
    invoiceTitle: "XXXXXXXXX",
    invoiceMailingAddress: "xxxxxxxxxx@sina.com",
    contactPerson: "wc",
    contactNumber: "12312321312312321",
    taxpayerIdentificationNumber:
      "12435324565423453213452345677865432134567654323242434334",
    BankDeposit: "中国银行",
    accountNumber: "12321321321312",
    processingMode: "邮寄",
  },
];
