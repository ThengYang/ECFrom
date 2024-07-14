import { INPUTCHECKLIST } from "@/app/constants/WigetType"
import Check from "@/app/components/inputs/checkList/Check"
import ViewBase from "../ViewBase"

interface InputCheckListProps {
   widget: INPUTCHECKLIST
   handleWidgetCondition: (parseEvent: string, data: any) => any
   updateWidget?: (widget: INPUTCHECKLIST) => void
}

const InputCheckList = (props: InputCheckListProps) => {

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
         <Check
            values={widget.answer}
            options={widget.options}
            setValue={setWidgetAnswer}
            varaint={widget.responseType}
            row={widget.groupColumn}
         />
      </ViewBase>
   )
}

export default InputCheckList