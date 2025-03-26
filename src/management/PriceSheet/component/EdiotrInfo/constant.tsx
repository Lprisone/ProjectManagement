import { DataType } from "../../constant";
import { FormInstance } from "antd";

export interface Props {
  form: FormInstance;
  currentInfo: DataType[] | undefined;
}

export const INFO_LAYOUT = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};
