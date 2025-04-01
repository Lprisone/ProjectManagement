/** 流水查看详情 */
import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import "./index.scss";
import { postRequest } from "src/utils";

interface Poprs {
  scoure: any;
  viewVisable: boolean;
  setViewVisable: (val: boolean) => void;
  handleSearch: () => void;
}

const { TextArea } = Input;

const updateUrl = "/user/saveOrUpdate";

const ViewUser = (props: Poprs) => {
  const { scoure, viewVisable, setViewVisable, handleSearch } = props;
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    const param = {
      ...values,
      id: scoure?.id || undefined,
    };

    await postRequest(param, updateUrl);
    setViewVisable(false);
    handleSearch();
  };

  useEffect(() => {
    form.setFieldsValue({
      ...scoure,
    });
  }, [scoure]);

  return (
    <Modal
      wrapClassName="client-datail-container"
      destroyOnClose
      title={"客户详情"}
      width={900}
      onCancel={() => setViewVisable(false)}
      open={viewVisable}
      onOk={handleOk}
    >
      <Form form={form}>
        <div className="client-basic-info">
          <div className="client-basic-info-title">基础信息</div>
          <div className="client-detail-frist">
            <Form.Item
              label="联系人"
              name="contactPerson"
              rules={[{ required: true, message: "请填写联系人" }]}
            >
              <Input
                className="client-basic-info-input"
                placeholder="请输入联系人"
              />
            </Form.Item>
            <Form.Item
              label="用户负责人"
              name="userManager"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                className="client-basic-info-input"
                placeholder="请输入用户负责人"
              />
            </Form.Item>
            <Form.Item
              label="销售"
              name="sales"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                placeholder="请输入销售"
                className="client-basic-info-input"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="所属公司"
            name="company"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input placeholder="请输入所属公司" />
          </Form.Item>
          <Form.Item
            label="开案"
            name="caseName"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <TextArea
              rows={4}
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder="请输入开案内容"
            />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <TextArea
              rows={4}
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder="请输入备注内容"
            />
          </Form.Item>
        </div>
        <div className="client-detail-info">
          <div className="client-detail-info-title">详细信息</div>
          <div className="client-detail-frist">
            <Form.Item
              label="用户等级"
              name="user_level"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input className="client-basic-info-input" />
            </Form.Item>
            <Form.Item
              label="年龄"
              name="userAge"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input className="client-basic-info-input" />
            </Form.Item>
            <Form.Item
              label="电话"
              name="telephone"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input className="client-basic-info-input" />
            </Form.Item>
          </div>
          <div className="client-detail-frist">
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                className="client-basic-info-input-val"
                placeholder="请输入邮箱"
              />
            </Form.Item>
            <Form.Item
              label="联系人地址"
              name="address"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input className="client-basic-info-input-val" />
            </Form.Item>
          </div>
          <Form.Item
            label="发票抬头"
            name="invoiceTitle"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="发票邮寄地址"
            name="invoiceAddress"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="纳税人识别号"
            name="tin"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="开户行"
            name="openBank"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="银行账号"
            name="bankAccount"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ViewUser;
