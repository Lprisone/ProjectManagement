/** 报价单 */
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Form, Input } from "antd";
import EditorInfo from "./component/EdiotrInfo";
import { jsPDF } from "jspdf";
import { postRequest, downloadPdf } from "src/utils";
import dayjs from "dayjs";

const listUrl = "/quotation/createQuotation"; // 查询接口

const PriceSheet = () => {
  const [form] = Form.useForm();

  const generatePDF = async () => {
    const values = await form.validateFields();
    const newJsonData = {
      quotationRecipientVo: {
        to: values?.to?.[0],
        recipient: values?.recipient,
        telephone: values?.telephone,
        date: dayjs(values?.date)?.format("YYYY-MM-DD"),
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
        isSwitch: values?.isSwitch,
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
    <div className="sheet-container">
      {/* <div className="sheet-filter">
        <Input
          onChange={(e) => setSearchValue(e?.target?.value)}
          className="price-sheet-head-search"
          placeholder="请输入关键字"
        />
      </div> */}
      <div className="sheet-body">
        <EditorInfo form={form} />
      </div>
      <div className="sheet-footer">
        <Button type="primary" onClick={() => generatePDF()}>
          生成报价单
        </Button>
      </div>
    </div>
  );
};

export default PriceSheet;
