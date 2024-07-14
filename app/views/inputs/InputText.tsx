
import { INPUTTEXT } from "@/app/constants/WigetType"
import { TextLine, TextBox } from "@/app/components/inputs/texts"
import ViewBase from "../ViewBase";

function isTextLine(type: any): type is "text" | 'number' | 'phone' | 'email' {
   return (
      type === "short answer" ||
      type === "number" ||
      type === "phone" ||
      type === 'email'
   );
}

interface InputTextProps {
   widget: INPUTTEXT
   updateWidget?: (widget: INPUTTEXT) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
}
const InputText = (props: InputTextProps) => {

   const {
      widget,
      updateWidget = () => void 0,
      handleWidgetCondition
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
         {isTextLine(widget.responseType) ?
            <TextLine
               value={widget.answer}
               setValue={setWidgetAnswer}
               type={widget.responseType}
               required={widget.require}
               variant={widget.variant}
               sx={{
                  width: '100%',
                  mt: widget.variant === 'inline' ? 0 : 0.5
               }}
            /> :
            (widget.responseType === 'paragraph') ?
               <TextBox
                  value={widget.answer}
                  setValue={setWidgetAnswer}
                  require={widget.require}
                  minRows={2}
                  sx={{ width: '100%', mt: 0.5 }}
               />
               : <></>
         }
      </ViewBase>
   )
}

export default InputText