import { WIDGET_TYPE, INPUTMULTISELECT } from "@/app/constants/WigetType"
import WidgetBase from "../WidgetBase";
import MultiSelect from "@/app/components/inputs/selects/MultiSelect";

interface InputMultiSelectProps {
   widget: INPUTMULTISELECT
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any,
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   setActive?: () => void
   setInactive?: () => void
}

const InputMultiSelect = (props: InputMultiSelectProps) => {
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

   const handleWidgetAnswerChange = (value: Array<string>) => {
      onChange(
         {
            ...widget,
            answer: value,
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
         <MultiSelect
            values={widget.answer}
            options={widget.options}
            setValue={handleWidgetAnswerChange}
         />
      </WidgetBase>
   )
}

export default InputMultiSelect