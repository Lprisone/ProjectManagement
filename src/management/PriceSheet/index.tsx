/** 报价单 */
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Input } from "antd";
import EditorInfo from "./component/EdiotrInfo";

const PriceSheet = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentInfo, setCurrentInfo] = useState();

  useEffect(() => {
    if (searchValue) queryData(searchValue);
  }, [searchValue]);

  /** 接口数据查询 */
  const queryData = (keyword: string) => {
    console.log("keyword", keyword);
    // API.xxx
    // 数据赋值
    // setCurrentInfo();
  };

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
        <EditorInfo currentInfo={currentInfo} />
        <Button type="primary">提交</Button>
      </div>
      <div className="price-sheet-foot"></div>
    </div>
  );
};

export default PriceSheet;
