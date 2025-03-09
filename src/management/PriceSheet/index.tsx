/** 报价单 */
import React, { useState } from "react";
import { Input, Table } from "antd";
import {tableColumns} from './constant';
import './index.scss';

const PriceSheet = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="price-sheet-container">
      <div className="price-sheet-head">
        <Input onChange={(e) => setSearchValue(e?.target?.value)} className="price-sheet-head-search" placeholder='请输入关键字' />
      </div>
      <div className="price-sheet-body">
        <Table 
        columns={tableColumns} 
        dataSource={[]} 
        />
      </div>
      <div className="price-sheet-foot"></div>
    </div>
  );
};

export default PriceSheet;
