/** 报价单 */
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Form, Input } from "antd";
import EditorInfo from "./component/EdiotrInfo";
import { jsPDF } from "jspdf";
import { postRequest, downloadPdf } from "src/utils";

const listUrl = "/quotation/createQuotation"; // 查询接口

const PriceSheet = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentInfo, setCurrentInfo] = useState<any>({});

  useEffect(() => {
    if (searchValue) queryData(searchValue);
  }, [searchValue]);

  /** 接口数据查询 */
  const queryData = async (keyword: string) => {
    console.log("keyword", keyword);
    await postRequest({}, listUrl);
    // setCurrentInfo();
  };

  const generatePDF = async () => {
    const values = await form.validateFields();
    console.log("???", values);
    const newJsonData = {
      quotationRecipientVo: {
        to: values?.to,
        recipient: values?.recipient,
        telephone: values?.telephone,
        date: values?.date,
        email: values?.email,
        remark: values?.remark,
        owner: values?.owner,
      },
      quotationServiceVo: {
        service: values?.service,
        standard: values?.standard,
        productName: values?.productName,
        sampleRequirement: values?.sampleRequirement,
        servicePeriod: values?.servicePeriod,
        amount: values?.amount,
        subtotal: values?.subtotal,
      },
      quotationInvoiceVo: {
        isSwitch: false,
        invoiceTitle: values?.invoiceTitle,
        invoiceAddress: values?.invoiceAddress,
        tin: values?.tin,
        openBank: values?.openBank,
        bankAccount: values?.bankAccount,
        invoiceContacts: values?.invoiceContacts,
        contactsTelephone: values?.contactsTelephone,
      },
      quotationAdditionalInfo: {},
    };

    await downloadPdf(newJsonData, listUrl);
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
        <EditorInfo form={form} currentInfo={currentInfo as any} />
        <div className="generate-btn">
          <Button type="primary" onClick={() => generatePDF()}>
            生成PDF
          </Button>
        </div>
      </div>
      <div className="price-sheet-foot"></div>
    </div>
  );
};

export default PriceSheet;
