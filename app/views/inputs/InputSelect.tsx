import { INPUTSELECT } from "@/app/constants/WigetType"
import SingleSelect from "@/app/components/inputs/selects/SingleSelect"
import ViewBase from "../ViewBase"

interface InputSelectProps {
   widget: INPUTSELECT,
   handleWidgetCondition: (parseEvent: string, data: any) => any
   updateWidget?: (widget: INPUTSELECT) => void
}

const InputSelect = (props: InputSelectProps) => {
   const {
      widget,
      handleWidgetCondition,
      updateWidget = () => void 0,
   } = props

   const setWidgetAnswer = (value: string) => {
      updateWidget({
         ...widget,
         answer: value
      })
   }

   return (
      <ViewBase
         widget={widget}
         handleWidgetCondition={handleWidgetCondition}
      >
         <SingleSelect
            value={widget.answer}
            options={widget.options}
            setValue={setWidgetAnswer}
         />
      </ViewBase>
   )
}

export default InputSelect