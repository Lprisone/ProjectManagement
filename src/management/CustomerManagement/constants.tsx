/**常量导出 */
import React from "react";
import { Popconfirm } from "antd";

export interface defaultValue {
  pageNum: number;
  pageSize: number;
  contactPerson?: string;
  company?: string;
  userManager?: string;
}

export const initUserValue = {
  pageNum: 1,
  pageSize: 10,
  contactPerson: undefined,
  company: undefined,
  userManager: undefined,
};

export const clientColumns = (
    setUserVisable: (val: boolean) => void,
    setUserInfo: (val: any) => void,
) => {
  return [
    {
      title: "联系人",
      dataIndex: "contactPerson",
      key: "contactPerson",
      render: (text: string) => text,
    },
    {
      title: "所属公司",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "销售",
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "开案",
      dataIndex: "caseName",
      key: "caseName",
    },
    {
      title: "给销售",
      dataIndex: "salesRecipient",
      key: "salesRecipient",
    },
    {
      title: "给工程师",
      dataIndex: "engineerRecipient",
      key: "engineerRecipient",
    },
    {
      title: "收款公司",
      dataIndex: "paymentCompany",
      key: "paymentCompany",
    },
    {
      title: "用户负责人",
      dataIndex: "userManager",
      key: "userManager",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
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
                setUserVisable(true);
                setUserInfo(record);
              }}
              className="client-body-table-action-editor"
            >
              编辑
            </a>
            <Popconfirm
              title="是否确认删除该流水信息"
              //   onConfirm={() => handleDelete([record?.id])}
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
