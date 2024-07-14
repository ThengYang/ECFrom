import React from "react";

import { Box } from "@mui/material";
import {
   WIDGET_TYPE,
   IS_NEWSECTION,
   IS_TEXT,
   IS_FORMGRID,
   IS_INPUTTEXT,
   IS_INPUTSELECT,
   IS_INPUTMULTISELECT,
   IS_INPUTDATETIME,
   IS_INPUTCHECKLIST,
   IS_INPUTTABLE
} from "@/app/constants/WigetType";

import Section from "@/app/widgets/layout/Section";
import TitleText from "@/app/widgets/texts/FormText";
import FormGrid from "@/app/widgets/layout/LayoutGrid";
import InputText from "@/app/widgets/Inputs/InputText";
import InputSelect from "@/app/widgets/Inputs/InputSelect";
import InputMultiSelect from "@/app/widgets/Inputs/InputMultiSelect";
import InputDateTime from "@/app/widgets/Inputs/InputDateTime";
import InputCheckList from "@/app/widgets/Inputs/InputCheckList";
import InputTable from "@/app/widgets/Inputs/InputTable";

interface GenerateWidgetProps {
   item: WIDGET_TYPE
   onChange?: Function
   onMove?: Function
   onAdd?: Function
   onDelete?: Function
   updateSubItems?: Function,
   widgetNames?: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: (item: WIDGET_TYPE | null) => void
   setInactive?: () => void,
   handleWidgetCondition?: (parseEvent: string, data: any) => any,
   newSectionExclude?: string,
}

const GenerateWidget = (props: GenerateWidgetProps) => {
   const {
      item = { type: 'new-section' },
      onChange = () => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      updateSubItems = () => void 0,
      widgetNames = {},
      setWidgetNames,
      setActive = () => void 0,
      setInactive = () => void 0,
      handleWidgetCondition = () => void 0,
      newSectionExclude = null,
   } = props

   if (IS_NEWSECTION(item)) {
      return (
         <Box>
            <Section onAdd={onAdd} id={item.id} exclude={newSectionExclude} />
         </Box>
      )
   }
   else if (IS_TEXT(item)) {
      return (
         <TitleText
            widget={item}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            setActive={() => setActive(null)}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_FORMGRID(item)) {
      return (
         <FormGrid
            widget={item}
            handleWidgetCondition={handleWidgetCondition}
            onAdd={onAdd}
            updateSubItems={updateSubItems}
            onDelete={onDelete}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTTEXT(item)) {
      return (
         <InputText
            widget={item}
            handleWidgetCondition={handleWidgetCondition}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={() => setActive(null)}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTSELECT(item)) {
      return (
         <InputSelect
            widget={item}
            handleWidgetCondition={handleWidgetCondition}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={() => setActive(null)}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTMULTISELECT(item)) {
      return (
         <InputMultiSelect
            widget={item}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={() => setActive(null)}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTDATETIME(item)) {
      return (
         <InputDateTime
            widget={item}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={() => setActive(null)}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTCHECKLIST(item)) {
      return (
         <InputCheckList
            widget={item}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={() => setActive(null)}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTTABLE(item)) {
      return (
         <InputTable
            widget={item}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={(widget?: WIDGET_TYPE) => widget ? setActive(widget) : setActive(null)}
            setInactive={setInactive}
         />
      )
   }

}

export default GenerateWidget