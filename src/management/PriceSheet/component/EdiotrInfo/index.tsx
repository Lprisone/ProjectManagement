/** 编辑信息 */
import React, { useState } from "react";
import { Modal, Form } from "antd";
import { Props } from "./constant";
import type { FormProps } from "antd";

const EditorInfo = (props: Props) => {
  const { infoVisable, setInfoVisable, currentInfo } = props;

  const handleOk = () => {
    console.log("信息确定");
  };
  return (
    <Modal
      title="编辑信息"
      open={infoVisable}
      onOk={handleOk}
      onCancel={() => setInfoVisable(false)}
    >
      <Form>
        <Form.Item label="TO"></Form.Item>
        <Form.Item label="收件人"></Form.Item>
        <Form.Item label="电话"></Form.Item>
        <Form.Item label="邮箱"></Form.Item>
        <Form.Item label="日期"></Form.Item>
        <Form.Item label="发票抬头"></Form.Item>
        <Form.Item label="发票邮寄地址"></Form.Item>
        <Form.Item label="联系人"></Form.Item>
        <Form.Item label="联系人电话"></Form.Item>
        <Form.Item label="纳税人识别号"></Form.Item>
        <Form.Item label="开户行"></Form.Item>
        <Form.Item label="账号"></Form.Item>
        <Form.Item label="处理方式"></Form.Item>
      </Form>
    </Modal>
  );
};

export default EditorInfo;
