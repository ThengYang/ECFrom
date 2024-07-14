import { WIDGET_TYPE, INPUTCHECKLIST } from "@/app/constants/WigetType"
import WidgetBase from "../WidgetBase";
import Check from "@/app/components/inputs/checkList/Check";

interface InputCheckListProps {
   widget: INPUTCHECKLIST
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   setActive?: () => void
   setInactive?: () => void
}

const InputCheckList = (props: InputCheckListProps) => {
   const {
      widget,
      widgetNames,
      setWidgetNames,
      handleWidgetCondition,
      onChange = (widget: WIDGET_TYPE) => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      setActive = () => void 0,
      setInactive = () => void 0,

   } = props

   const handleWidgetAnswerChange = (values: Array<string>) => {
      onChange(
         {
            ...widget,
            answer: values
         }
      )
   }

   return (
      <WidgetBase
         widget={widget}
         handleWidgetCondition={handleWidgetCondition}
         widgetNames={widgetNames}
         setWidgetNames={setWidgetNames}
         onChange={onChange}
         onAdd={onAdd}
         onDelete={onDelete}
         setActive={setActive}
         setInactive={setInactive}
      >
         <Check
            values={widget.answer}
            options={widget.options}
            setValue={handleWidgetAnswerChange}
            varaint={widget.responseType as 'radio' | 'list'}
            row={widget.groupColumn}
         />
      </WidgetBase>
   )
}

export default InputCheckList