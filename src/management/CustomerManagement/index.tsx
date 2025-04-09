/**客户管理 */
import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Pagination, Table, Popconfirm } from "antd";
import "./index.scss";
import { clientColumns, initUserValue, defaultValue } from "./constants";
import { postRequest } from "src/utils";
import ViewUser from "./AddOrUpdateUesr";
import _ from "lodash";

const userDetailUrl = "/user/selectUser";
const deleteUrl = "/user/deleteUserList";

const CustomerManagement = () => {
  const [headFilter, setHeadFilter] = useState<defaultValue>({
    ...initUserValue,
  });
  const [userVisable, setUserVisable] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [tableScoure, setTableScoure] = useState<any>();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const handleDetail = useCallback(
    _.debounce(async () => {
      const param = {
        ...headFilter,
      };
      const res = await postRequest(param, userDetailUrl);
      setTableScoure(res);
    }, 500),
    [headFilter]
  );

  useEffect(() => {
    handleDetail();
  }, [headFilter]);

  const handlBatchDelete = async () => {
    await postRequest(selectedKeys, deleteUrl);
    handleDetail();
  };

  return (
    <div className="client-container">
      <div className="client-filter">
        <div className="client-filter-item">
          <span>联系人：</span>
          <Input
            className="client-fliter-search"
            placeholder="请输入联系人"
            onChange={(e) => {
              setHeadFilter({
                ...headFilter,
                contactPerson: e?.target?.value,
              });
            }}
          />
        </div>
        <div className="client-filter-item">
          <span>所属公司：</span>
          <Input
            className="client-fliter-search"
            placeholder="请输入所属公司"
            onChange={(e) => {
              setHeadFilter({
                ...headFilter,
                company: e?.target?.value,
              });
            }}
          />
        </div>
        <div className="client-filter-item">
          <span>用户负责人：</span>
          <Input
            className="client-fliter-search"
            placeholder="请输入用户负责人"
            onChange={(e) => {
              setHeadFilter({
                ...headFilter,
                userManager: e?.target?.value,
              });
            }}
          />
        </div>
        <Button
          className="client-fliter-add-btn"
          type="primary"
          onClick={() => setUserVisable(true)}
        >
          新增客户
        </Button>
      </div>
      <div className="client-body">
        <Table
          dataSource={tableScoure?.data?.userVoList || []}
          columns={clientColumns(setUserVisable, setUserInfo)}
          rowKey={"id"}
          rowSelection={{
            onChange: (e) => setSelectedKeys(e),
          }}
          pagination={false}
        />
      </div>
      <div className="client-footer">
        <div className="client-footer-action">
          <Popconfirm title="是否确定删除" onConfirm={handlBatchDelete}>
            <Button>批量删除</Button>
          </Popconfirm>
        </div>
        <div className="client-footer-page">
          <Pagination
            size="small"
            total={tableScoure?.totalCount}
            showSizeChanger={true}
            pageSize={headFilter?.pageSize}
            current={headFilter?.pageNum}
            onChange={(pageNum, pageSize) => {
              setSelectedKeys([]);
              setHeadFilter({ ...headFilter, pageSize, pageNum });
            }}
          />
        </div>
      </div>
      <ViewUser
        scoure={userInfo}
        setScoure={setUserInfo}
        viewVisable={userVisable}
        setViewVisable={setUserVisable}
        handleSearch={handleDetail}
      />
    </div>
  );
};

export default CustomerManagement;
