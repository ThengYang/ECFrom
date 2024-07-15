import Date from "@/app/components/inputs/dateTime/Date";
import Time from "@/app/components/inputs/dateTime/Time";
import DateTime from "@/app/components/inputs/dateTime/DateTime";
import DateRange from "@/app/components/inputs/dateTime/DateRange";

import { WIDGET_TYPE, INPUTDATETIME } from "@/app/constants/WigetType"
import WidgetBase from "../WidgetBase";

interface InputDateTimeProps {
   widget: INPUTDATETIME
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   setActive?: (widgetID: string | null | undefined) => void
   setInactive?: () => void
}

const InputDateTime = (props: InputDateTimeProps) => {
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
         {widget.responseType === 'datetime' ?
            <DateTime value={widget.answer} setValue={handleWidgetAnswerChange} /> : widget.responseType === 'time' ?
               <Time value={widget.answer} setValue={handleWidgetAnswerChange} /> : widget.responseType === 'date' ?
                  <Date value={widget.answer} setValue={handleWidgetAnswerChange} /> : widget.responseType === 'daterange' ?
                     <DateRange value={widget.answer} setValue={handleWidgetAnswerChange} /> : <></>
         }
      </WidgetBase>
   )
}

export default InputDateTime