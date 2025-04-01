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
          label="项目编号"
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
          label="售价"
          name="price"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="开案时间"
          name="startTime"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="结案时间"
          name="finishTime"
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
          label="分包方"
          name="subcontractorName"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="分包方联系人"
          name="subcontractorPerson"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="收款公司"
          name="payeeCompany"
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
        <Form.Item
          label="项目支出(分包方)"
          name="projectCostSubcon"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目支出(工程师)"
          name="projectCostEngineer"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目支出(项目归属人)"
          name="projectCostOwner"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目利润"
          name="projectNetProfit"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewProjectDetails;
