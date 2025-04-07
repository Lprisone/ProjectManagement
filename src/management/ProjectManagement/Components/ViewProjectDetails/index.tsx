/**项目管理详情 */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import form from "antd/es/form";
import { postRequest } from "src/utils";

const saveOrUpdateUrl = "/projectRegister/saveOrUpdate";

interface Poprs {
  scoure: any;
  viewVisable: boolean;
  setViewVisable: (val: boolean) => void;
  requestDetail: () => void;
}

const ViewProjectDetails = (props: Poprs) => {
  const [form] = Form.useForm();
  const { scoure, viewVisable, setViewVisable, requestDetail } = props;

  useEffect(() => {
    form.setFieldsValue({
      ...scoure,
    });
  }, [scoure]);

  const handleAddOrUpdate = async (param: any) => {
    const newPrarm = {
      ...param,
      id: param?.id || undefined,
      financialRecordList: [],
    };
    await postRequest(newPrarm, saveOrUpdateUrl);
    setViewVisable(false);
    requestDetail();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    handleAddOrUpdate(values);
  };

  return (
    <Modal
      destroyOnClose
      title={"项目详情"}
      width={900}
      onCancel={() => setViewVisable(false)}
      open={viewVisable}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          label="项目编号"
          name="projectNo"
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
          name="projectCostToSubcon"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目支出(工程师)"
          name="projectCostToEngineer"
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
