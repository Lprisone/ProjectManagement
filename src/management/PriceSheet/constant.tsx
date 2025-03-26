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