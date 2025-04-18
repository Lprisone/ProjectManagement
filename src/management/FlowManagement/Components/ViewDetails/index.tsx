/** 流水查看详情 */
import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, InputNumber } from "antd";
import { invoiceEnum, checkEnum, formatAmount, parseAmount } from "./constants";
import dayjs from "dayjs";
import "./index.scss";
import { postRequest } from "src/utils";

interface Poprs {
  scoure: any;
  setScoure: (val: any) => void;
  viewVisable: boolean;
  setViewVisable: (val: boolean) => void;
  handleSearch: () => void;
  searchStatistics: () => void;
}

const { Option } = Select;
const updateUrl = "/financialRecord/saveOrUpdate";

const ViewDetails = (props: Poprs) => {
  const {
    scoure,
    setScoure,
    viewVisable,
    setViewVisable,
    handleSearch,
    searchStatistics,
  } = props;
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const param = {
        ...values,
        billAmount: parseAmount(values?.billAmount?.toString()),
        financialRecordsDate: dayjs(values.financialRecordsDate)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        id: scoure?.id || undefined,
        projectNo: scoure?.projectNo,
      };

      await postRequest(param, updateUrl);
      setViewVisable(false);
      handleSearch();
      searchStatistics();
      setScoure(undefined);
      form.resetFields();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...scoure,
      financialRecordsDate: dayjs(scoure?.financialRecordsDate),
      billAmount: formatAmount(scoure?.billAmount),
    });
  }, [scoure]);

  return (
    <Modal
      wrapClassName="flow-datail-container"
      destroyOnClose
      title={"流水详情"}
      width={900}
      onCancel={() => {
        setViewVisable(false);
        setScoure(undefined);
        form.resetFields();
      }}
      open={viewVisable}
      onOk={handleOk}
    >
      <Form form={form}>
        <div className="flow-detail-frist">
          <Form.Item
            label="项目编号"
            name="projectNo"
            rules={[{ required: false, message: "请填写项目编号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="水单日期"
            name="financialRecordsDate"
            rules={[{ required: false, message: "请选择水单日期" }]}
          >
            <DatePicker className="flow-detail-frist-date" />
          </Form.Item>
        </div>
        <div className="flow-detail-frist">
          <Form.Item
            label="账单金额"
            name="billAmount"
            rules={[{ required: false, message: "Please input!" }]}
          >
            <InputNumber
              prefix="￥"
              formatter={(value) => formatAmount(value)}
              parser={(value) => parseAmount(value)}
              placeholder="请输入金额"
              min={0}
              precision={4}
              controls={false}
              className="flow-detail-frist-amount"
            />
          </Form.Item>
          <Form.Item
            label="发票状态"
            name="invoiceStatus"
            rules={[{ required: false, message: "Please input!" }]}
          >
            <Select className="flow-detail-frist-status" allowClear>
              {invoiceEnum.map((item) => {
                return (
                  <Option value={item} title={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: false, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="交易对象"
          name="transactionTarget"
          rules={[{ required: false, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="款项类型"
          name="amountType"
          rules={[{ required: false, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="进出帐"
          name="inOutAccount"
          rules={[{ required: false, message: "Please input!" }]}
        >
          <Select allowClear>
            {checkEnum.map((item) => {
              return (
                <Option value={item} title={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewDetails;
