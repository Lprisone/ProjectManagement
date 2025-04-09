import React, { useState } from "react";
import { Table } from "antd";
import { childColumns, Iprops } from "./constants";
import { postRequest } from "src/utils";
import ViewDetails from "src/management/FlowManagement/Components/ViewDetails";

const querDeletesUrl = "/financialRecord/deleteFinancialRecord"; // 请求删除

const FlowDeatil = (props: Iprops) => {
  const { detailScoure, requestDetail, searchInfo } = props;
  const [getInfo, setGetInfo] = useState<any>({});
  const [viewVisable, setViewVisable] = useState<boolean>(false);

  const handleDelete = async (ids: number[]) => {
    await postRequest(ids, querDeletesUrl);
    requestDetail();
    searchInfo();
  };

  return (
    <>
      <Table
        dataSource={detailScoure}
        columns={childColumns(setViewVisable, setGetInfo, handleDelete)}
        pagination={false}
      />
      <ViewDetails
        scoure={getInfo}
        setScoure={setGetInfo}
        viewVisable={viewVisable}
        setViewVisable={setViewVisable}
        handleSearch={requestDetail}
        searchStatistics={searchInfo}
      />
    </>
  );
};

export default FlowDeatil;
