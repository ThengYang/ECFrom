import { WIDGET_TYPE, INPUTSELECT } from "@/app/constants/WigetType"

import WidgetBase from "../WidgetBase";
import SingleSelect from "@/app/components/inputs/selects/SingleSelect"

interface InputSelectProps {
   widget: INPUTSELECT
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any,
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   setActive?: () => void
   setInactive?: () => void
}

const InputSelect = (props: InputSelectProps) => {

   const {
      widget,
      handleWidgetCondition,
      widgetNames,
      setWidgetNames,
      onChange = (widget: WIDGET_TYPE) => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      setActive = () => void 0,
      setInactive = () => void 0,

   } = props

   const handleWidgetAnswerChange = (value: string) => {
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
         <SingleSelect
            value={widget.answer}
            options={widget.options}
            setValue={handleWidgetAnswerChange}
         />
      </WidgetBase>
   )
}

export default InputSelect