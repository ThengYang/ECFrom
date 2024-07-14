import { INPUTTEXT, WIDGET_TYPE } from "@/app/constants/WigetType"
import { TextBox, TextLine } from "@/app/components/inputs/texts";
import WidgetBase from "../WidgetBase";

interface InputTextProps {
   widget: INPUTTEXT
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: () => void
   setInactive?: () => void
   handleWidgetCondition: (parseEvent: string, data: any) => any,
}

const InputText = (props: InputTextProps) => {

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

   function isTextLine(responseType: any): responseType is "text" | 'number' | 'phone' | 'email' {
      return (
         responseType === "short answer" ||
         responseType === "number" ||
         responseType === "phone" ||
         responseType === 'email'
      );
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
         {isTextLine(widget.responseType) ?
            <TextLine
               value={widget.answer}
               type={widget.responseType}
               setValue={handleWidgetAnswerChange}
               variant={widget.variant}
               sx={{
                  width: '100%',
                  mt: widget.variant === 'inline' ? 0 : 0.5
               }}
            /> : (widget.responseType === 'paragraph') ?
               <TextBox
                  value={widget.answer}
                  setValue={handleWidgetAnswerChange}
                  minRows={2}
                  sx={{ width: '100%', mt: 0.5 }}
               />
               : <></>
         }
      </WidgetBase>
   )
}

export default InputText