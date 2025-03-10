/** 编辑信息 */
import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Select } from "antd";
import { Props, INFO_LAYOUT } from "./constant";
import _ from "lodash";
import "./index.scss";

const { Option } = Select;

const EditorInfo = (props: Props) => {
  const [form] = Form.useForm();
  const { currentInfo } = props;

  useEffect(() => {
    if (!_.isEmpty(currentInfo)) {
      const { TO, addressee, phone, email, date, mark } = currentInfo || {};
      form.setFieldsValue({
        TO: TO,
        addressee: addressee,
        phone: phone,
        email: email,
        date: date,
        mark: mark,
      });
    }
  }, [form, currentInfo]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="info-container">
      <Form form={form}>
        <div className="info-basic-info">
          <h3>基本信息</h3>
          <div className="info-basic-info-values">
            <Form.Item
              {...INFO_LAYOUT}
              label="TO"
              name="TO"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="收件人"
              name="addressee"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="电话"
              name="phone"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="日期"
              name="date"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="备注"
              name="mark"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div>
          <h3>发票信息</h3>
          <Form.Item
               {...INFO_LAYOUT}
            label="发票抬头"
            name="invoiceTitle"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="发票邮寄地址"
            name="invoiceMailingAddress"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系人"
            name="contactPerson"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系人电话"
            name="contactNumber"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="纳税人识别号"
            name="taxpayerIdentificationNumber"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="开户行"
            name="BankDeposit"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="账号"
            name="accountNumber"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="处理方式"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <h3>产品信息</h3>
          <Form.Item
            label="所需测试/认证服务"
            name="mark"
            rules={[{ required: true, message: "Please input!" }]}
          ></Form.Item>
          <Form.Item
            label="测试标准"
            name="mark"
            rules={[{ required: true, message: "Please input!" }]}
          ></Form.Item>
          <Form.Item
            label="产品名称/型号"
            name="mark"
            rules={[{ required: true, message: "Please input!" }]}
          ></Form.Item>
          <Form.Item
            label="这样要求"
            name="mark"
            rules={[{ required: true, message: "Please input!" }]}
          ></Form.Item>
          <Form.Item
            label="测试/认证服务周期"
            name="mark"
            rules={[{ required: true, message: "Please input!" }]}
          ></Form.Item>
          <Form.Item
            label="金额"
            name="mark"
            rules={[{ required: true, message: "Please input!" }]}
          ></Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditorInfo;
