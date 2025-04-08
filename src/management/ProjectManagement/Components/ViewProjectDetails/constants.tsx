import React from "react";
import { DatePicker, InputNumber, Popconfirm, Select } from "antd";
import Input from "antd/es/input/Input";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  formatAmount,
  parseAmount,
  invoiceEnum,
} from "src/management/FlowManagement/Components/ViewDetails/constants";
import _ from "lodash";

const { Option } = Select;

export const flowColumns = (flowList: any, setFlowList: (val: any) => void) => {
  const handleOption = (id: string) => {
    const newData = flowList?.filter((item: any) => item?.id !== id);
    setFlowList(newData);
  };

  const handleCopy = (id: string, key: string, val: any) => {
    const newVal = flowList?.map((item: any) => {
      if (typeof item === "object" && item?.id === id) {
        return { ...item, [key]: val };
      }
      return item;
    });

    setFlowList(newVal);
  };

  return [
    {
      title: "水单日期",
      dataIndex: "financialRecordsDate",
      key: "financialRecordsDate",
      width: "12%",
      render: (text: string, record: any) => {
        const { id } = record;
        return (
          <DatePicker
            value={dayjs(text)}
            onChange={(e) => {
              const newValue = dayjs(e)?.format("YYYY-MM-DD 00:00:00");

              const updatedFlowList = _.cloneDeep(flowList)?.map(
                (item: any) => {
                  if (typeof item === "object" && item?.id === id) {
                    return { ...item, financialRecordsDate: newValue };
                  }
                  return item;
                }
              );

              setFlowList(updatedFlowList);
            }}
          />
        );
      },
    },
    {
      title: "账单金额",
      dataIndex: "billAmount",
      key: "billAmount",
      width: "12%",
      render: (text: string, record: any) => {
        return (
          <InputNumber
            value={Number(text)}
            prefix="￥"
            formatter={(value) => formatAmount(value)}
            parser={(value) => parseAmount(value)}
            placeholder="请输入金额"
            min={0}
            precision={4}
            controls={false}
            className="project-flow-item"
            onChange={(e) => {
              handleCopy(record?.id, "billAmount", e);
            }}
          />
        );
      },
    },
    {
      title: "交易对象",
      dataIndex: "transactionTarget",
      key: "transactionTarget",
      width: "12%",
      render: (text: string, record: any) => {
        return (
          <Input
            value={text}
            onChange={(e) =>
              handleCopy(record?.id, "transactionTarget", e?.target?.value)
            }
          />
        );
      },
    },
    {
      title: "款项类型",
      dataIndex: "amountType",
      key: "amountType",
      width: "12%",
      render: (text: string, record: any) => {
        return (
          <Input
            value={text}
            onChange={(e) =>
              handleCopy(record?.id, "amountType", e?.target?.value)
            }
          />
        );
      },
    },
    {
      title: "发票状态",
      dataIndex: "invoiceStatus",
      key: "invoiceStatus",
      width: "12%",
      render: (text: string, record: any) => {
        return (
          <Select
            value={text}
            className="project-flow-item"
            allowClear
            onChange={(e) => handleCopy(record?.id, "invoiceStatus", e)}
          >
            {invoiceEnum.map((item) => {
              return (
                <Option value={item} title={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      width: "12%",
      render: (text: string, record: any) => {
        return (
          <Input
            value={text}
            onChange={(e) =>
              handleCopy(record?.id, "content", e?.target?.value)
            }
          />
        );
      },
    },
    {
      title: "进出帐",
      dataIndex: "inOutAccount",
      key: "inOutAccount",
      width: "12%",
      render: (text: string, record: any) => {
        return (
          <Input
            value={text}
            onChange={(e) =>
              handleCopy(record?.id, "inOutAccount", e?.target?.value)
            }
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: "5%",
      render: (_text: any, record: any) => {
        return (
          <div>
            <Popconfirm
              title="是否确认删除该流水信息"
              onConfirm={() => handleOption(record?.id)}
              okText="确定"
              cancelText="取消"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};
