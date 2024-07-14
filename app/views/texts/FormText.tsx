import { TEXT } from "@/app/constants/WigetType";
import ViewBase from "../ViewBase";

interface FormTextProps {
   widget: TEXT
   handleWidgetCondition: (parseEvent: string, data: any) => any
}

const FormText = ({ widget, handleWidgetCondition }: FormTextProps) => {
   return (
      <ViewBase
         widget={widget}
         handleWidgetCondition={handleWidgetCondition}
      />
   )
}

export default FormText