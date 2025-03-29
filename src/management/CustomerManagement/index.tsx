/**客户管理 */
import React, { useEffect, useState } from "react";
import { Button, Input, Pagination, Table } from "antd";
import "./index.scss";
import { clientColumns, initUserValue, defaultValue } from "./constants";
import { postRequest } from "src/utils";
import ViewUser from "./AddOrUpdateUesr";

const userDetailUrl = "/user/selectUser";

const CustomerManagement = () => {
  const [headFilter, setHeadFilter] = useState<defaultValue>({
    ...initUserValue,
  });
  const [userVisable, setUserVisable] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [tableScoure, setTableScoure] = useState<any>();

  const handleDetail = async () => {
    const param = {
      ...headFilter,
    };
    const res = await postRequest(param, userDetailUrl);
    setTableScoure(res);
  };

  useEffect(() => {
    handleDetail();
  }, [headFilter]);

  return (
    <div className="client-container">
      <div className="client-filter">
        <Input className="client-fliter-search" placeholder="请输入关键字" />
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
          pagination={false}
        />
      </div>
      <div className="client-footer">
        <div className="client-footer-page">
          <Pagination
            size="small"
            total={tableScoure?.totalCount}
            showSizeChanger={true}
            pageSize={headFilter?.pageSize}
            current={headFilter?.pageNum}
            onChange={(pageNum, pageSize) => {
              setHeadFilter({ ...headFilter, pageSize, pageNum });
            }}
          />
        </div>
      </div>
      <ViewUser
        scoure={userInfo}
        viewVisable={userVisable}
        setViewVisable={setUserVisable}
        handleSearch={handleDetail}
      />
    </div>
  );
};

export default CustomerManagement;
