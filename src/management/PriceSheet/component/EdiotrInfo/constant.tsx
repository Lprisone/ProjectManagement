import { DataType } from "../../constant";
import { FormInstance } from "antd";

export interface Props {
  form: FormInstance;
}

export const INFO_LAYOUT = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};

export const modeList = [
  {
    label: "报废",
    key: "scrap",
  },
  {
    label: "寄回(委托方付费)",
    key: "sendBack",
  },
  {
    label: "委托方领取(保留1周, 超过1周作报废处理)",
    key: "consignorToReceive",
  },
];
