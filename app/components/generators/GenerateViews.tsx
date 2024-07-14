import {
   WIDGET_TYPE,
   IS_INPUTTEXT,
   IS_TEXT,
   IS_INPUTSELECT,
   IS_INPUTDATETIME,
   IS_INPUTMULTISELECT,
   IS_FORMGRID,
   IS_INPUTCHECKLIST,
   IS_INPUTTABLE
} from "@/app/constants/WigetType"

import {
   FormText,
   InputText,
   InputSelect,
   InputMultiSelect,
   InputCheckList,
   InputDateTime,
   LayoutGrid,
   InputTable
} from "@/app/views/views";

interface GenerateViewsProps {
   widget: WIDGET_TYPE,
   updateWidget?: (widget: WIDGET_TYPE) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
}
const GenerateViews = (props: GenerateViewsProps) => {
   const {
      widget,
      updateWidget = () => void 0,
      handleWidgetCondition,
   } = props

   if (IS_TEXT(widget)) {
      return (
         <FormText widget={widget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
   else if (IS_INPUTTEXT(widget)) {
      return (
         <InputText widget={widget} updateWidget={updateWidget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
   else if (IS_INPUTSELECT(widget)) {
      return (
         <InputSelect widget={widget} updateWidget={updateWidget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
   else if (IS_INPUTMULTISELECT(widget)) {
      return (
         <InputMultiSelect widget={widget} updateWidget={updateWidget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
   else if (IS_INPUTCHECKLIST(widget)) {
      return (
         <InputCheckList widget={widget} updateWidget={updateWidget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
   else if (IS_INPUTDATETIME(widget)) {
      return (
         <InputDateTime widget={widget} updateWidget={updateWidget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
   else if (IS_INPUTTABLE(widget)) {
      return (
         <InputTable widget={widget} updateWidget={updateWidget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
   else if (IS_FORMGRID(widget)) {
      return (
         <LayoutGrid widget={widget} updateWidget={updateWidget} handleWidgetCondition={handleWidgetCondition} />
      )
   }
}

export default GenerateViews