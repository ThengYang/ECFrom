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
   setInactive?: () => void
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
   } = props

   if (IS_NEWSECTION(item)) {
      return (
         <Box>
            <Section onAdd={onAdd} id={item.id} />
         </Box>
      )
   }
   else if (IS_TEXT(item)) {
      return (

         <TitleText
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            value={item.value}
            fontSize={item.fontSize}
            fontColor={item.fontColor}
            fontFamily={item.fontFamily}
            lineHeight={item.lineHeight}
            align={item.align}
            justify={item.justify}
            marginTop={item.marginTop}
            marginRight={item.marginRight}
            marginLeft={item.marginLeft}
            marginBottom={item.marginBottom}
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
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            column={item.column}
            row={item.row}
            items={item.items}
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
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            fontColor={item.fontColor}
            fontSize={item.fontSize}
            fontFamily={item.fontFamily}
            lineHeight={item.lineHeight}
            align={item.align}
            justify={item.justify}
            marginTop={item.marginTop}
            marginRight={item.marginRight}
            marginLeft={item.marginLeft}
            marginBottom={item.marginBottom}
            question={item.question}
            require={item.require}
            responseType={item.responseType}
            answer={item.answer}
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
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            fontColor={item.fontColor}
            fontSize={item.fontSize}
            fontFamily={item.fontFamily}
            lineHeight={item.lineHeight}
            align={item.align}
            justify={item.justify}
            marginTop={item.marginTop}
            marginRight={item.marginRight}
            marginLeft={item.marginLeft}
            marginBottom={item.marginBottom}
            question={item.question}
            answer={item.answer}
            options={item.options}
            require={item.require}
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
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            fontColor={item.fontColor}
            fontSize={item.fontSize}
            fontFamily={item.fontFamily}
            lineHeight={item.lineHeight}
            align={item.align}
            justify={item.justify}
            marginTop={item.marginTop}
            marginRight={item.marginRight}
            marginLeft={item.marginLeft}
            marginBottom={item.marginBottom}
            question={item.question}
            answer={item.answer}
            options={item.options}
            require={item.require}
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
   else if (IS_INPUTDATETIME(item)) {
      return (
         <InputDateTime
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            fontColor={item.fontColor}
            fontSize={item.fontSize}
            fontFamily={item.fontFamily}
            lineHeight={item.lineHeight}
            align={item.align}
            justify={item.justify}
            marginTop={item.marginTop}
            marginRight={item.marginRight}
            marginLeft={item.marginLeft}
            marginBottom={item.marginBottom}
            question={item.question}
            require={item.require}
            responseType={item.responseType}
            answer={item.answer}
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
   else if (IS_INPUTCHECKLIST(item)) {
      return (
         <InputCheckList
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            fontColor={item.fontColor}
            fontSize={item.fontSize}
            fontFamily={item.fontFamily}
            lineHeight={item.lineHeight}
            align={item.align}
            justify={item.justify}
            marginTop={item.marginTop}
            marginRight={item.marginRight}
            marginLeft={item.marginLeft}
            marginBottom={item.marginBottom}
            question={item.question}
            answer={item.answer}
            options={item.options}
            require={item.require}
            responseType={item.responseType}
            groupColumn={item.groupColumn}
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
   else if (IS_INPUTTABLE(item)) {
      return (
         <InputTable
            id={item.id}
            parentId={item.parentId}
            type={item.type}
            name={item.name}
            fontColor={item.fontColor}
            fontSize={item.fontSize}
            fontFamily={item.fontFamily}
            lineHeight={item.lineHeight}
            align={item.align}
            justify={item.justify}
            marginTop={item.marginTop}
            marginRight={item.marginRight}
            marginLeft={item.marginLeft}
            marginBottom={item.marginBottom}
            question={item.question}
            answer={item.answer}
            label={item.label}
            column={item.column}
            row={item.row}
            require={item.require}
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

}

export default GenerateWidget