/** 报价单 */
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Input } from "antd";
import EditorInfo from "./component/EdiotrInfo";
import { jsPDF } from "jspdf";
import { mockData } from "./constant";

const PriceSheet = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentInfo, setCurrentInfo] = useState(mockData);

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

  const generatePDF = () => {
    // 使用jsPDF创建PDF文档
    let pdf = new jsPDF();

    // 根据数据生成PDF内容
    // 这里假设data是一个对象数组，每个对象都有title和description两个字段
    currentInfo?.forEach((item, index) => {
      pdf.text(item.phone, 10, (index + 1) * 10); // 设置文本位置
      pdf.text(item.mark, 15, (index + 1) * 15);
    });

    // 触发下载
    pdf.save("generated-document.pdf");
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
        <EditorInfo currentInfo={currentInfo as any} />
        <div className="generate-btn">
          <Button type="primary" onClick={()=> generatePDF()}>生成PDF</Button>
        </div>
      </div>
      <div className="price-sheet-foot"></div>
    </div>
  );
};

export default PriceSheet;
