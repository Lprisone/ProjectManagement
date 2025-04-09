/** 编辑信息 */
import React, { useEffect } from "react";
import { Form, Input, Col, Row, Switch, Select } from "antd";
import { Props, INFO_LAYOUT, modeList } from "./constant";
import _ from "lodash";
import "./index.scss";

const { Option } = Select;

const EditorInfo = (props: Props) => {
  const { currentInfo, form } = props;

  useEffect(() => {
    if (!_.isEmpty(currentInfo)) {
      form.setFieldsValue({
        ...currentInfo,
      });
    }
  }, [currentInfo]);

  const style: React.CSSProperties = {
    padding: "8px 0",
  };

  return (
    <Form form={form}>
      <div className="info-container">
        <div className="info-basic-info">
          <div className="info-basic-info-title">基本信息</div>
          <div className="info-basic-info-values">
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={7}>
                <div style={style}>
                  <Form.Item
                    label="to"
                    name="to"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={7}>
                <div style={style}>
                  <Form.Item
                    label="收件人"
                    name="recipient"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={7}>
                <div style={style}>
                  <Form.Item
                    label="电话"
                    name="telephone"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={7}>
                <div style={style}>
                  <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={7}>
                <div style={style}>
                  <Form.Item
                    label="日期"
                    name="date"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col className="gutter-row" span={7}>
                <div style={style}>
                  <Form.Item
                    label="备注"
                    name="remark"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="info-invoice-information">
          <div className="info-invoice-information-title">发票信息</div>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  {...INFO_LAYOUT}
                  label="发票抬头"
                  name="invoiceTitle"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="发票邮寄地址"
                  name="invoiceAddress"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="联系人"
                  name="invoiceContacts"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="联系人电话"
                  name="contactsTelephone"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="纳税人识别号"
                  name="tin"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="开户行"
                  name="openBank"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="账号"
                  name="bankAccount"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="处理方式"
                  name="processingMode"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Select>
                    {modeList?.map((item) => (
                      <Option value={item?.key} title={item?.label}>
                        {item?.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="小计"
                  name="subtotal"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="是否需要发票信息"
                  name="isSwitch"
                  rules={[{ required: false }]}
                >
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    defaultChecked
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </div>
        <div className="info-product-info">
          <div className="info-product-info-title">产品信息</div>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="所需测试/认证服务"
                  name="service"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="测试标准"
                  name="standard"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="产品名称/型号"
                  name="productName"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="这样要求"
                  name="sampleRequirement"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="测试/认证服务周期"
                  name="servicePeriod"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div style={style}>
                <Form.Item
                  label="金额"
                  name="amount"
                  rules={[{ required: false, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
};

export default EditorInfo;
