import { INPUTMULTISELECT } from "@/app/constants/WigetType"
import ViewBase from "../ViewBase"
import MultiSelect from "@/app/components/inputs/selects/MultiSelect"

interface InputMultiSelectProps {
   widget: INPUTMULTISELECT,
   handleWidgetCondition: (parseEvent: string, data: any) => any
   updateWidget?: (widget: INPUTMULTISELECT) => void
}
const InputMultiSelect = (props: InputMultiSelectProps) => {
   const { widget, handleWidgetCondition, updateWidget = () => void 0 } = props

   const setWidgetAnswer = (values: Array<string>) => {
      updateWidget({
         ...widget,
         answer: values
      })
   }

   return (
      <ViewBase
         widget={widget}
         handleWidgetCondition={handleWidgetCondition}
      >
         <MultiSelect
            values={widget.answer}
            options={widget.options}
            setValue={setWidgetAnswer}
         />
      </ViewBase>
   )
}

export default InputMultiSelect