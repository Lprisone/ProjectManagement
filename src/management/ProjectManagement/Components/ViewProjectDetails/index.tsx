/**项目管理详情 */
import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

interface Poprs {
  scoure: any;
  viewVisable: boolean;
  setViewVisable: (val: boolean) => void;
}

const ViewProjectDetails = (props: Poprs) => {
  const { scoure, viewVisable, setViewVisable } = props;
  return (
    <Modal
      destroyOnClose
      title={"查看详情"}
      width={900}
      onCancel={() => setViewVisable(false)}
      open={viewVisable}
      onOk={() => {
        console.log(">>>okk");
      }}
    >
      <Form>
        <Form.Item
          label="产品编号"
          name="productNo"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="客户"
          name="company"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="服务内容"
          name="serviceContent"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="状态"
          name="projectStatus"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="成本"
          name="cost"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="时间"
          name="finishTime"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="首款"
          name="first"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="尾款"
          name="last"
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
          label="销售"
          name="sales"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="开案"
          name="caseName"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="给销售"
          name="salesRecipient"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="给工程师"
          name="engineerRecipient"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="收款公司"
          name="paymentCompany"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="补充信息"
          name="remak"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="付款比例"
          name="paymentRatio"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目归属人"
          name="projectOwner"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewProjectDetails;
