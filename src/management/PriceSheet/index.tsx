/** 报价单 */
import React, { useState } from "react";
import "./index.scss";
import { Input, Table } from "antd";
import EditorInfo from "./component/EdiotrInfo";
import { tableColumns, DataType, mockData } from "./constant";

const PriceSheet = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [infoVisable, setInfoVisable] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<DataType | undefined>();

  return (
    <div className="price-sheet-container">
      <div className="price-sheet-head">
        <Input
          onChange={(e) => setSearchValue(e?.target?.value)}
          className="price-sheet-head-search"
          placeholder="请输入关键字"
        />
      </div>
      <div className="price-sheet-body">
        <Table
          columns={tableColumns(setInfoVisable,setCurrentInfo) as any}
          dataSource={mockData}
        />
      </div>
      <div className="price-sheet-foot"></div>
      <EditorInfo infoVisable={infoVisable} setInfoVisable={setInfoVisable} currentInfo={currentInfo} />
    </div>
  );
};

export default PriceSheet;
