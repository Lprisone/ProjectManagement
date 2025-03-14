import React from "react";
import { Input, type GetProp, type RadioChangeEvent, type TableProps } from "antd";

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
  bankDeposit: string;
  accountNumber: string;
  processingMode: string;
}

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
    bankDeposit: "中国银行",
    accountNumber: "12321321321312",
    processingMode: "邮寄",
  },
];
