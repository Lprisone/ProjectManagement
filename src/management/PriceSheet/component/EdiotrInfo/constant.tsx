import { DataType } from "../../constant";

export interface Props {
  infoVisable: boolean;
  setInfoVisable: (val: boolean) => void;
  currentInfo: DataType | undefined;
}
