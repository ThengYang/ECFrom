import { useEffect } from "react";
import { WIDGET_TYPE, INPUTTABLE } from "@/app/constants/WigetType"
import WidgetBase from "../WidgetBase";
import Table from "@/app/components/inputs/table/Table";
import GenerateWidget from "@/app/components/generators/GenerateWidget";
import initialize from "../widgetInitializer";
import { Box } from "@mui/material";


interface InputTableProps {
   widget: INPUTTABLE
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   setActive?: (widget?: WIDGET_TYPE) => void
   setInactive?: () => void
}

const InputTable = (props: InputTableProps) => {
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

   const setRowValue = () => {
      if (widget.setValue) {
         const newRow = [...widget.row]
         for (const col of newRow) {
            for (const item of widget.setValue) {
               if (item.target && item.code) {
                  const test = handleWidgetCondition('set value', item.code)

                  const testEc = new Function('widget, idx', test)
                  const val = testEc(widget, widget.row.indexOf(col))
                  col[item.target] = val
               }
            }
         }
         return newRow
      }
      return undefined
   }

   useEffect(() => {
      const newRow = setRowValue()
      if (newRow) handleWidgetAnswerChange(newRow)

   }, [widget.setValue])

   const handleWidgetAnswerChange = (newRow: Array<{ id: number, [key: string]: any }>) => {
      onChange(
         {
            ...widget,
            row: newRow,
         }
      )
   }

   const addFooter = (widgetType: string) => {
      const { newWidget, newWidgetNames } = initialize(widget.id, widgetType, widgetNames);
      console.log(newWidget)
      onChange({
         ...widget,
         footer: newWidget,
      })
      setWidgetNames(newWidgetNames)
   }

   const updateFooter = (newWdiget: WIDGET_TYPE) => {

      onChange({
         ...widget,
         footer: newWdiget
      })
   }

   const deleteFooter = () => {
      onChange({
         ...widget,
         footer: {
            id: widget.footer.id,
            parentId: widget.footer.parentId,
            type: 'new-section',
            name: ''
         }
      })
   }

   const setFooterActive = (childWidget: WIDGET_TYPE | null) => {
      if (childWidget) {
         setActive(childWidget)
      }
      else {
         setActive(widget.footer)
      }
   }

   setRowValue()
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
         <Table
            column={widget.column}
            row={widget.row}
            setValue={handleWidgetAnswerChange}
            makeFooter={() =>
               <GenerateWidget
                  item={widget.footer}
                  handleWidgetCondition={handleWidgetCondition}
                  setWidgetNames={setWidgetNames}
                  onDelete={deleteFooter}
                  onAdd={(id: number, itemType: string) => addFooter(itemType)}
                  onChange={(newItem: WIDGET_TYPE) => updateFooter(newItem)}
                  widgetNames={widgetNames}
                  setActive={setFooterActive}
                  setInactive={setInactive}
               />
            }
         />
      </WidgetBase>
   )
}

export default InputTable