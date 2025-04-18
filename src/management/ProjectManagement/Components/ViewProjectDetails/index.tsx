/**项目管理详情 */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Select,
  Table,
  message,
} from "antd";
import { postRequest } from "src/utils";
import {
  formatAmount,
  parseAmount,
} from "src/management/FlowManagement/Components/ViewDetails/constants";
import "./index.scss";
import _ from "lodash";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { flowColumns } from "./constants";

const saveOrUpdateUrl = "/projectRegister/saveOrUpdate";
const searchCustomerUrl = "/user/selectUser";

const { TextArea } = Input;
const { Option } = Select;

const statusOptions = ["已完成", "进行中"];

interface Poprs {
  scoure: any;
  setScoure: (val: any) => void;
  viewVisable: boolean;
  setViewVisable: (val: boolean) => void;
  requestDetail: () => void;
}

const ViewProjectDetails = (props: Poprs) => {
  const [form] = Form.useForm();
  const { scoure, setScoure, viewVisable, setViewVisable, requestDetail } =
    props;
  const [searchOwner, setSearchOwner] = useState<any>();
  const [isFlow, setIsFlow] = useState<boolean>(false);
  const [flowList, setFlowList] = useState<any>([]);

  useEffect(() => {
    form.setFieldsValue({
      ...scoure,
      startTime: dayjs(scoure?.startTime),
      finishTime: dayjs(scoure?.finishTime),
    });
    if (!_.isEmpty(scoure?.financialRecordList)) {
      setFlowList(scoure?.financialRecordList);
      setIsFlow(true);
    }
  }, [scoure]);

  const handleOk = async () => {
    try {
      const param = await form.validateFields();
      const keyToRemove = "id";
      const result = flowList?.map((item: any) => {
        const { [keyToRemove]: _, ...rest } = item;
        return rest;
      });

      const newPrarm = {
        ...param,
        company: param?.company?.[0]?.toString(),
        startTime: dayjs(param?.startTime)?.format("YYYY-MM-DD"),
        finishTime: dayjs(param?.finishTime)?.format("YYYY-MM-DD"),
        id: scoure?.id || undefined,
        gmtCreate: dayjs(scoure?.gmtCreate)?.format("YYYY-MM-DD HH:mm:ss"),
        financialRecordList: result,
      };
      await postRequest(newPrarm, saveOrUpdateUrl);
      setViewVisable(false);
      requestDetail();
      form.resetFields();
    } catch (e) {
      message.error("请填写表单数据");
    }
  };

  const handleDetail = _.debounce(async () => {
    const param = {
      pageNum: 1,
      pageSize: 100,
    };
    const res = await postRequest(param, searchCustomerUrl);
    setSearchOwner(res?.data?.userVoList);
  }, 500);

  const handleAddFlow = () => {
    const newFlow = {
      id: uuidv4(),
      financialRecordsDate: dayjs(new Date())?.format("YYYY-MM-DD 00:00:00"),
      billAmount: undefined,
      transactionTarget: undefined,
      amountType: undefined,
      invoiceStatus: undefined,
      content: undefined,
      inOutAccount: undefined,
    };
    setFlowList([...flowList, newFlow]);
  };

  return (
    <Modal
      destroyOnClose={true}
      title={"项目详情"}
      width={1300}
      onCancel={() => {
        setViewVisable(false);
        form.resetFields();
        setFlowList([]);
        setIsFlow(false);
        setScoure(undefined);
      }}
      open={viewVisable}
      footer={
        <>
          <Button
            onClick={() => {
              setViewVisable(false);
              form.resetFields();
              setFlowList([]);
              setIsFlow(false);
              setScoure(undefined);
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              setIsFlow(true);
              handleAddFlow();
            }}
          >
            插入流水
          </Button>
          <Button type="primary" onClick={handleOk}>
            确定
          </Button>
        </>
      }
      wrapClassName="project-detail-modal"
    >
      <Form form={form}>
        <div className="project-detail-frist">
          <Form.Item
            label="项目编号"
            name="projectNo"
            rules={[{ required: false }]}
          >
            <Input disabled className="project-detail-frist-item" />
          </Form.Item>
          <Form.Item
            label="状态"
            name="projectStatus"
            rules={[{ required: false, message: "Please input!" }]}
          >
            <Select className="project-detail-frist-item">
              {statusOptions.map((item) => (
                <Option value={item} title={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="客户"
          name="company"
          rules={[{ required: true, message: "请选择客户" }]}
        >
          <Select mode="tags" onFocus={handleDetail}>
            {searchOwner?.map((item: any) => (
              <Option value={item?.id} title={item?.company}>
                {item?.company}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="联系人"
          name="contactPerson"
          rules={[{ required: true, message: "请填写联系人" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="服务内容"
          name="serviceContent"
          rules={[{ required: true, message: "请填写服务内容" }]}
        >
          <Input />
        </Form.Item>
        <div className="project-detail-frist">
          <Form.Item
            label="成本"
            name="cost"
            rules={[{ required: true, message: "请输入成本" }]}
          >
            <Input className="project-detail-frist-item" />
          </Form.Item>
          <Form.Item
            label="售价"
            name="price"
            rules={[{ required: true, message: "请填写售价" }]}
          >
            <Input className="project-detail-frist-item" />
          </Form.Item>
        </div>
        <div className="project-detail-frist">
          <Form.Item
            label="开案时间"
            name="startTime"
            rules={[{ required: false }]}
          >
            <DatePicker className="project-detail-frist-item" />
          </Form.Item>
          <Form.Item
            label="结案时间"
            name="finishTime"
            rules={[{ required: false }]}
          >
            <DatePicker className="project-detail-frist-item" />
          </Form.Item>
        </div>
        <Form.Item
          label="分包方"
          name="subcontractorName"
          rules={[{ required: true, message: "请填写分包方" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="分包方联系人"
          name="subcontractorContactPerson"
          rules={[{ required: true, message: "请填写分包方联系人" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="收款公司"
          name="payeeCompany"
          rules={[{ required: true, message: "请填写收款公司" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目归属人"
          name="projectOwner"
          rules={[{ required: true, message: "请填写项目归属人!" }]}
        >
          <Input />
        </Form.Item>
        <div className="project-detail-frist">
          <Form.Item
            label="项目支出(项目归属人)"
            name="projectCostOwner"
            rules={[{ required: false }]}
          >
            <InputNumber
              prefix="￥"
              formatter={(value) => formatAmount(value)}
              parser={(value) => parseAmount(value)}
              placeholder="请输入金额"
              min={0}
              precision={4}
              controls={false}
              className="project-detail-frist-cost"
            />
          </Form.Item>
          <Form.Item
            label="项目支出(分包方)"
            name="projectCostToSubcon"
            rules={[{ required: false }]}
          >
            <InputNumber
              prefix="￥"
              formatter={(value) => formatAmount(value)}
              parser={(value) => parseAmount(value)}
              placeholder="请输入金额"
              min={0}
              precision={4}
              controls={false}
              className="project-detail-frist-cost"
            />
          </Form.Item>
        </div>
        <div className="project-detail-frist">
          <Form.Item
            label="项目支出(工程师)"
            name="projectCostToEngineer"
            rules={[{ required: false }]}
          >
            <InputNumber
              prefix="￥"
              formatter={(value) => formatAmount(value)}
              parser={(value) => parseAmount(value)}
              placeholder="请输入金额"
              min={0}
              precision={4}
              controls={false}
              className="project-detail-frist-cost"
            />
          </Form.Item>
          <Form.Item
            label="项目利润"
            name="projectNetProfit"
            rules={[{ required: false }]}
          >
            <InputNumber
              prefix="￥"
              formatter={(value) => formatAmount(value)}
              parser={(value) => parseAmount(value)}
              placeholder="请输入金额"
              min={0}
              precision={4}
              controls={false}
              className="project-detail-frist-cost"
            />
          </Form.Item>
        </div>
        <div className="project-detail-frist">
          <Form.Item
            label="付款比例"
            name="paymentRatio"
            rules={[{ required: false }]}
          >
            <InputNumber
              formatter={(value) => formatAmount(value)}
              parser={(value) => parseAmount(value)}
              placeholder="请输入付款比例"
              min={0}
              precision={4}
              controls={false}
              className="project-detail-frist-item"
            />
          </Form.Item>
        </div>
        <Form.Item label="补充信息" name="remark" rules={[{ required: false }]}>
          <TextArea
            rows={4}
            autoSize={{ minRows: 4, maxRows: 6 }}
            placeholder="请输入补充信息"
          />
        </Form.Item>
      </Form>
      {isFlow && (
        <Table
          dataSource={flowList}
          columns={flowColumns(flowList, setFlowList)}
          pagination={false}
        />
      )}
    </Modal>
  );
};

export default ViewProjectDetails;
