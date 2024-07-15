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
   widget: WIDGET_TYPE | null | undefined
   onChange?: Function
   onMove?: Function
   onAdd?: Function
   onDelete?: Function
   updateSubItems?: Function,
   widgetNames?: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   getWidget?: (id: string) => WIDGET_TYPE | null | undefined
   setActive?: (widgetID: string | null | undefined) => void
   setInactive?: () => void,
   handleWidgetCondition?: (parseEvent: string, data: any) => any,
   newSectionExclude?: string,
}

const GenerateWidget = (props: GenerateWidgetProps) => {
   const {
      widget = { type: 'new-section' },
      onChange = () => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      updateSubItems = () => void 0,
      widgetNames = {},
      setWidgetNames,
      getWidget = () => void 0,
      setActive = () => void 0,
      setInactive = () => void 0,
      handleWidgetCondition = () => void 0,
      newSectionExclude = null,
   } = props

   if (IS_NEWSECTION(widget)) {
      return (
         <Box>
            <Section onAdd={onAdd} id={widget.id} exclude={newSectionExclude} />
         </Box>
      )
   }
   else if (IS_TEXT(widget)) {
      return (
         <TitleText
            widget={widget}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_FORMGRID(widget)) {
      return (
         <FormGrid
            widget={widget}
            getWidget={getWidget}
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
   else if (IS_INPUTTEXT(widget)) {
      return (
         <InputText
            widget={widget}
            handleWidgetCondition={handleWidgetCondition}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTSELECT(widget)) {
      return (
         <InputSelect
            widget={widget}
            handleWidgetCondition={handleWidgetCondition}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTMULTISELECT(widget)) {
      return (
         <InputMultiSelect
            widget={widget}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTDATETIME(widget)) {
      return (
         <InputDateTime
            widget={widget}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTCHECKLIST(widget)) {
      return (
         <InputCheckList
            widget={widget}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }
   else if (IS_INPUTTABLE(widget)) {
      return (
         <InputTable
            widget={widget}
            getWidget={getWidget}
            widgetNames={widgetNames}
            setWidgetNames={setWidgetNames}
            handleWidgetCondition={handleWidgetCondition}
            onChange={onChange}
            updateSubItems={updateSubItems}
            onAdd={onAdd}
            onDelete={onDelete}
            setActive={setActive}
            setInactive={setInactive}
         />
      )
   }

}

export default GenerateWidget