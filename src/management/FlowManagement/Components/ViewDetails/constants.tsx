/** 流水管理常量 */
import React from "react";

enum INVOICESENUM {
  InvoicedOut = "已开票",
  NotInvoiced = "未开票",
  Emprty = "不开票",
}

export const invoiceEnum = [
  INVOICESENUM.InvoicedOut,
  INVOICESENUM.NotInvoiced,
  INVOICESENUM.Emprty,
];

enum INANDOUTACCOUNT {
  InAccount = "进账",
  OutAccount = "出账",
}

export const checkEnum = [
  INANDOUTACCOUNT.InAccount,
  INANDOUTACCOUNT.OutAccount,
];

// 格式化金额（整数部分添加千分位分隔符，小数部分保持不变）
export const formatAmount = (value: any) => {
  if (!value) return "";

  // 分离整数部分和小数部分
  const [integerPart, decimalPart] = `${value}`.split(".");

  // 对整数部分添加千分位分隔符
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 如果有小数部分，则拼接回去；否则只返回整数部分
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

// 解析金额（移除千分位分隔符）
export const parseAmount = (value: any) => {
  if (!value) return "";
  return value.replace(/,/g, ""); // 移除所有逗号
};
