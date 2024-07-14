
import { INPUTDATETIME } from "@/app/constants/WigetType"
import Date from "@/app/components/inputs/dateTime/Date";
import Time from "@/app/components/inputs/dateTime/Time";
import DateTime from "@/app/components/inputs/dateTime/DateTime";
import DateRange from "@/app/components/inputs/dateTime/DateRange";
import ViewBase from "../ViewBase";

interface InputDateTimeProps {
   widget: INPUTDATETIME
   handleWidgetCondition: (parseEvent: string, data: any) => any
   updateWidget?: (widget: INPUTDATETIME) => void
}

const InputDateTime = (props: InputDateTimeProps) => {

   const { widget, handleWidgetCondition, updateWidget = () => void 0 } = props

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
         {widget.responseType === 'datetime' ?
            <DateTime value={widget.answer} setValue={setWidgetAnswer} /> : widget.responseType === 'time' ?
               <Time value={widget.answer} setValue={setWidgetAnswer} /> : widget.responseType === 'date' ?
                  <Date value={widget.answer} setValue={setWidgetAnswer} /> : widget.responseType === 'daterange' ?
                     <DateRange value={widget.answer} setValue={setWidgetAnswer} /> : <></>
         }
      </ViewBase>
   )
}

export default InputDateTime